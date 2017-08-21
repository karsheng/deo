import _ from 'lodash';
import React, { Component } from 'react';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import CircularProgress from 'material-ui/CircularProgress';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const EventMapGoogle = _.flowRight(withScriptjs, withGoogleMap)(props =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {<Marker {...props.marker} />}
  </GoogleMap>
);

class EventMap extends Component {
  state = {
    marker: {
      position: {
        lat: this.props.lat,
        lng: this.props.lng
      }
    }
  };

  render() {
    return (
      <EventMapGoogle
        loadingElement={<CircularProgress />}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAcg0gg8Bv8Ty9dtFb1EtnsSkdxEZdQ1fE"
        containerElement={<div style={{ height: `300px` }} />}
        mapElement={<div style={{ height: `300px` }} />}
        marker={this.state.marker}
        lat={this.props.lat}
        lng={this.props.lng}
      />
    );
  }
}

export default EventMap;
