import React from 'react';
import './MeteoriteInfoPopup.scss';
import { formattedDate } from '../../MapContainer/MapContainer';

export default function MeteoriteInfoPopup(props) {
  const {
    info: { name, recclass, mass, fall, year, nametype, reclat, reclong }
  } = props;
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
      </div>
    </div>
  );
}
