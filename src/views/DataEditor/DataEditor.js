import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Datetime from 'react-datetime';
import uuid from 'react-uuid';
import moment from 'moment';
import reduce from 'lodash/reduce';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import './DataEditor.scss';
import { formattedDate, validateForm } from '../../utils';
import { REC_CLASSES } from '../../constants';
import { putMeteoriteData } from '../../actions';

const mapDispatchToProps = dispatch => ({
  doPutMeteoriteData: data => dispatch(putMeteoriteData(data))
});

class DataEditor extends Component {
  constructor(props) {
    super(props);

    const {
      location: {
        state: { info }
      }
    } = this.props;
    const {
      name,
      nametype,
      recclass,
      mass,
      fall,
      year,
      reclat,
      reclong
    } = info;

    this.state = {
      meteorite: {
        name,
        recclass,
        mass,
        fall,
        year: formattedDate(year),
        reclat,
        reclong,
        nametype
      },
      errors: {
        name: ''
      }
    };
    this.onFormFieldChange = this.onFormFieldChange.bind(this);
    this.onYearFieldChange = this.onYearFieldChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.goBackToMap = this.goBackToMap.bind(this);
    this.resetToOriginal = this.resetToOriginal.bind(this);
  }

  onFormFieldChange(e) {
    const {
      target: { id, value }
    } = e;

    const { errors, meteorite } = this.state;
    switch (id) {
      case 'name':
        errors.name = value.length < 1 ? 'Meteorite name is required!' : '';
        break;
      default:
        break;
    }
    meteorite[id] = value;
    this.setState({ errors, meteorite });
  }

  onYearFieldChange(momentDate) {
    const { meteorite } = this.state;

    const d = new Date(momentDate.toDate().getFullYear(), 0, 1);
    this.setState({ meteorite: { ...meteorite, year: formattedDate(d) } });
  }

  onFormSubmit(e) {
    e.preventDefault();

    const {
      history,
      location: {
        state: { info: dataFromPopup }
      },
      doPutMeteoriteData
    } = this.props;
    const { meteorite: dataAfterSubmit } = this.state;
    const dataToUpdate = {};
    this.getUpdatedFields(dataFromPopup, dataAfterSubmit).forEach(key => {
      if (key === 'geolocation' || key === 'id' || key === 'year') return;
      dataToUpdate[key] = dataAfterSubmit[key];
    });
    if (Object.keys(dataToUpdate).length !== 0) {
      dataToUpdate.id = dataFromPopup.id;
      doPutMeteoriteData(dataToUpdate);
      history.goBack();
    } else {
      history.goBack();
    }
  }

  getUpdatedFields = (dataFromPopup, dataAfterSubmit) =>
    reduce(
      dataFromPopup,
      (result, value, key) =>
        isEqual(value, dataAfterSubmit[key]) ? result : result.concat(key),
      []
    );

  isValidDate = currentDate =>
    moment(currentDate).isSameOrBefore(new Date(), 'year');

  goBackToMap() {
    const { history } = this.props;
    history.goBack();
  }

  resetToOriginal() {
    const {
      location: {
        state: { info: dataFromPopup }
      }
    } = this.props;
    this.setState({
      meteorite: { ...this.state.meteorite, ...dataFromPopup },
      errors: { name: '' }
    });
  }

  render() {
    const {
      meteorite: {
        name,
        nametype,
        recclass,
        mass,
        fall,
        year,
        reclat,
        reclong
      },
      errors
    } = this.state;
    const { name: nameFieldError } = errors;
    return (
      <div className="App__page App__page--editor">
        <div className="App__page__title">Data Editor</div>
        <form className="editor-form" onSubmit={this.onFormSubmit}>
          <div className="editor-form__field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={this.onFormFieldChange}
            />
            {nameFieldError.length > 0 && (
              <span className="editor-form__field__error">
                {nameFieldError}
              </span>
            )}
          </div>
          <div className="editor-form__field">
            <label htmlFor="nametype">Name Type:</label>
            <select
              value={nametype}
              id="nametype"
              onChange={this.onFormFieldChange}
            >
              <option value="Valid">Valid</option>
              <option value="InValid">InValid</option>
            </select>
          </div>
          <div className="editor-form__field">
            <label htmlFor="recclass">Rec Class:</label>
            <select
              value={recclass}
              id="recclass"
              onChange={this.onFormFieldChange}
            >
              {REC_CLASSES.map(rc => (
                <option key={uuid()} value={rc}>
                  {rc}
                </option>
              ))}
            </select>
          </div>
          <div className="editor-form__field">
            <label htmlFor="recclass">Mass:</label>
            <input
              type="number"
              id="mass"
              min="1"
              value={mass}
              onChange={this.onFormFieldChange}
            />
          </div>
          <div className="editor-form__field">
            <label htmlFor="fall">Fall:</label>
            <select value={fall} id="fall" onChange={this.onFormFieldChange}>
              <option value="Fell">Fell</option>
              <option value="Found">Found</option>
            </select>
          </div>
          <div className="editor-form__field">
            <label htmlFor="year">Year: </label>
            <Datetime
              dateFormat="YYYY"
              id="year"
              value={year}
              viewDate={Datetime.moment(year)}
              onChange={this.onYearFieldChange}
              closeOnSelect
              isValidDate={this.isValidDate}
            />
          </div>
          <div className="editor-form__field">
            <h2 className="coord-label">
              <span>Coordinates </span>
            </h2>
            <div className="coordinates">
              <div className="coordinates__field">
                <label htmlFor="reclat">Latitude:</label>
                <input
                  type="number"
                  id="reclat"
                  min="-90"
                  max="90"
                  step="any"
                  value={reclat}
                  onChange={this.onFormFieldChange}
                />
              </div>
              <div className="coordinates__field">
                <label htmlFor="reclong">Longitude:</label>
                <input
                  type="number"
                  id="reclong"
                  min="-180"
                  max="180"
                  step="any"
                  value={reclong}
                  onChange={this.onFormFieldChange}
                />
              </div>
            </div>
          </div>
          <div className="editor-form__actions">
            <button
              type="button"
              className="btn secondary"
              onClick={this.goBackToMap}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn"
              onClick={this.resetToOriginal}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn"
              disabled={!validateForm(errors)}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(withRouter(DataEditor));
