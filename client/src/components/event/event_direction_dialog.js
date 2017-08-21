import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import ReactSVG from 'react-svg';
import IconButton from 'material-ui/IconButton';

const style = {
  contentStyle: {
    maxWidth: 380,
    maxHeight: 500
  },
  googleIconBtn: {
    padding: 0,
    width: 60,
    height: 60,
    marginRight: 20
  },
  googleMaps: {
    width: 60,
    height: 60
  },
  uberIconBtn: {
    padding: 0,
    width: 100,
    height: 60,
    marginRight: 20
  },
  uber: {
    width: 100,
    height: 60
  }
};

class EventDirectionDialog extends Component {
  renderUberIcon(lat, lng) {
    return (
      <IconButton
        style={style.uberIconBtn}
        iconStyle={style.uber}
        href={
          'https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=' +
          lat +
          '&dropoff[longitude]=' +
          lng
        }
        target="_blank"
      >
        <ReactSVG path="https://upload.wikimedia.org/wikipedia/commons/6/62/Uber_logo.svg" />
      </IconButton>
    );
  }

  renderGoogleMapsIcon(lat, lng) {
    return (
      <IconButton
        style={style.googleIconBtn}
        iconStyle={style.googleMaps}
        href={
          'https://www.google.com/maps/dir/?api=1&destination=' +
          lat +
          ',' +
          lng +
          '&travelmode=driving'
        }
        target="_blank"
      >
        <ReactSVG path="https://upload.wikimedia.org/wikipedia/en/2/23/GoogleMaps.svg" />
      </IconButton>
    );
  }

  render() {
    const { lat, lng } = this.props;

    return (
      <Dialog
        title="Direction/Transport"
        modal={false}
        contentStyle={style.contentStyle}
        open={this.props.directionDialogOpen}
        onRequestClose={this.props.closeDirectionDialog}
      >
        <div>
          {this.renderGoogleMapsIcon(lat, lng)}
          {this.renderUberIcon(lat, lng)}
        </div>
      </Dialog>
    );
  }
}

export default EventDirectionDialog;
