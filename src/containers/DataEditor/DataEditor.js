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

export class DataEditor extends Component {
  constructor(props) {
    super(props);

    const {
      location: { state: { info = {}, fromPopup } = {} }
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
      fromPopup,
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

  /**
   * Since i am expecting data passed in router state from the popup,
   * not rendering page if not navigated  to from a popup;
   */
  static getDerivedStateFromProps(props, state) {
    const { history } = props;
    const { fromPopup } = state;
    if (!fromPopup) {
      history.push('/');
    }
    return state;
  }

  /**
   * handle field change by validating field and updating state
   * @param {Event} e
   */
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

  /**
   * Datetime onChange passes a moment date object not an d Event object so handling this fields
   * onchange separately
   * @param {} momentDate
   */
  onYearFieldChange(momentDate) {
    const { meteorite } = this.state;

    const d = new Date(momentDate.toDate().getFullYear(), 0, 1);
    this.setState({ meteorite: { ...meteorite, year: formattedDate(d) } });
  }

  /**
   * Not allowing keyboard input on date picker, for simplicity.
   */
  onYearKeyDown = e => {
    e.preventDefault();
  };

  /**
   * Submit change to meteorite data
   * @param {Event} e
   */
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
    this.getUpdatedFields(
      this.cleanDataForComparison(dataFromPopup),
      this.cleanDataForComparison(dataAfterSubmit)
    ).forEach(key => {
      if (key === 'geolocation' || key === 'id') return;
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

  /**
   * Formats year field to format to original format
   */
  cleanDataForComparison = data => {
    const dataCopy = { ...data };
    dataCopy.year = moment(data.year).format();
    return dataCopy;
  };

  /**
   * check to see which fields were updated on meteorite data
   */
  getUpdatedFields = (dataFromPopup, dataAfterSubmit) =>
    reduce(
      dataFromPopup,
      (result, value, key) =>
        isEqual(value, dataAfterSubmit[key]) ? result : result.concat(key),
      []
    );

  /**
   * Callback that enables/disables year options in date picker
   */
  isValidDate = currentDate =>
    moment(currentDate).isSameOrBefore(new Date(), 'year');

  /**
   * navigate back to map via cancel button click
   */
  goBackToMap() {
    const { history } = this.props;
    history.goBack();
  }

  /**
   * reset button click handler, resets form values to original state passed form popup.
   */
  resetToOriginal() {
    const {
      location: {
        state: { info: dataFromPopup }
      }
    } = this.props;
    const { state: meteorite } = this;
    dataFromPopup.year = formattedDate(dataFromPopup.year);
    this.setState({
      meteorite: { ...meteorite, ...dataFromPopup },
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
              name="recclass"
              onChange={this.onFormFieldChange}
            >
              {REC_CLASSES.sort().map(rc => (
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
              step="any"
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
            <div className="date-picker">
              <i className="material-icons">calendar_today</i>
              <Datetime
                dateFormat="YYYY"
                id="year"
                value={year}
                viewDate={Datetime.moment(year)}
                onChange={this.onYearFieldChange}
                inputProps={{ onKeyDown: this.onYearKeyDown }}
                closeOnSelect
                isValidDate={this.isValidDate}
              />
            </div>
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
              id="cancelBtn"
              className="btn secondary"
              onClick={this.goBackToMap}
            >
              Cancel
            </button>
            <button
              type="button"
              id="resetBtn"
              className="btn"
              onClick={this.resetToOriginal}
            >
              Reset
            </button>
            <button
              type="submit"
              id="submitBtn"
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
