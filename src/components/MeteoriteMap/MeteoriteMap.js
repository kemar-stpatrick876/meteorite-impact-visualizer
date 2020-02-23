import React, { Component } from 'react';
import MapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl
} from 'react-map-gl';
import { MAPBOX_TOKEN } from '../../constants';
import MeteoritePin from '../MeteoritePin/MeteoritePin';
import './MeteoriteMap.scss';
import MeteoriteInfoPopup from '../MeteoriteInfoPopup/MeteoriteInfoPopup';

export default class MeteoriteMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 0,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
    this.onClickMarker = this.onClickMarker.bind(this);
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  onClickMarker = meteorite => {
    console.log(meteorite);
    this.setState({ popupInfo: meteorite });
  };

  renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={parseFloat(popupInfo.reclong)}
          latitude={parseFloat(popupInfo.reclat)}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <MeteoriteInfoPopup info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    const { meteoriteImpacts } = this.props;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <MeteoritePin data={meteoriteImpacts} onClick={this.onClickMarker} />
        {this.renderPopup()}
        <div className="MeteoriteMap__full-screen">
          <FullscreenControl />
        </div>
        <div className="MeteoriteMap__nav-control">
          <NavigationControl />
        </div>
        <div className="MeteoriteMap__scale-screen">
          <ScaleControl />
        </div>
      </MapGL>
    );
  }
}
