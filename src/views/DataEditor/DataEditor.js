import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Datetime from 'react-datetime';
import uuid from 'react-uuid';
import moment from 'moment';
import './DataEditor.scss';
import { formattedDate } from '../../utils';
import { REC_CLASSES } from '../../constants';

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
      name,
      recclass,
      mass,
      fall,
      year: formattedDate(year),
      reclat,
      reclong,
      nametype
    };
    this.onFormFieldChange = this.onFormFieldChange.bind(this);
    this.onYearFieldChange = this.onYearFieldChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.goBackToMap = this.goBackToMap.bind(this); // i think you are missing this
  }

  onFormFieldChange(e) {
    const {
      target: { id, value }
    } = e;
    this.setState({ [id]: value });
  }

  onYearFieldChange(momentDate) {
    const d = new Date(momentDate.toDate().getFullYear(), 0, 1);
    this.setState({ year: formattedDate(d) });
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  isValidDate = currentDate =>
    moment(currentDate).isSameOrBefore(new Date(), 'year');

  goBackToMap() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const {
      name,
      nametype,
      recclass,
      mass,
      fall,
      year,
      reclat,
      reclong
    } = this.state;
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
                  value={reclat}
                  onChange={this.onFormFieldChange}
                />
              </div>
              <div className="coordinates__field">
                <label htmlFor="reclong">Longitude:</label>
                <input
                  type="number"
                  id="reclong"
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
            <button type="button" className="btn">
              Reset
            </button>
            <button type="submit" className="btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(DataEditor);
