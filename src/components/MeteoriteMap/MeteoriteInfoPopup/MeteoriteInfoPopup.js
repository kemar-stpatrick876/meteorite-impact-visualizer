import React from 'react';
import './MeteoriteInfoPopup.scss';
import { Link } from 'react-router-dom';
import { formattedDate } from '../../../utils';

export default function MeteoriteInfoPopup(props) {
  const { info } = props;
  const {
    name,
    recclass,
    mass,
    fall,
    year,
    nametype,
    reclat,
    reclong,
    id
  } = info;
  return (
    <div className="MeteoriteInfoPopup">
      <div className="MeteoriteInfoPopup__header">{name}</div>
      <div className="MeteoriteInfoPopup__body">
        <div className="info-row">
          <span>Rec class: </span>
          <span>{recclass}</span>
        </div>
        <div className="info-row">
          <span>Name type: </span>
          <span>{nametype}</span>
        </div>
        <div className="info-row">
          <span>Mass: </span>
          <span>{mass}</span>
        </div>
        <div className="info-row">
          <span>Fall/Found: </span>
          <span>{fall}</span>
        </div>
        <div className="info-row">
          <span>Year: </span>
          <span>{formattedDate(year)}</span>
        </div>
        <div className="info-row">
          <span>Longitude: </span>
          <span>{reclong}</span>
        </div>
        <div className="info-row">
          <span>Latitude: </span>
          <span>{reclat}</span>
        </div>
        <Link
          className="edit-link"
          to={{
            pathname: `/edit/meteorite/${id}`,
            state: { fromPopup: true, info }
          }}
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
