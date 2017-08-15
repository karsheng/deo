import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import ReactSVG from "react-svg";
import IconButton from "material-ui/IconButton";

const style = {
  contentStyle: {
    maxWidth: 380,
    maxHeight: 500
  },
  iconBtn: {
      padding: 0,
      width: 100,
      height: 60,
      marginRight: 20
  },
  airBnb: {
      width: 100,
      height: 60
  },
  booking: {
      marginTop: 3,
      width: 100,
      height: 60
  }
};

class EventAccommodationDialog extends Component {
	renderAirbnbButton(lat, lng) {
		return (
			<IconButton
			    style={style.iconBtn}
			    iconStyle={style.airBnb}
				href={`https://airbnb.com/s/homes?lat=${lat}&lng=${lng}`}
				target="_blank"
			>
				<ReactSVG path="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" />
			</IconButton>
		);
	}
	renderBookingButton(address) {
		return (
			<IconButton
			    style={style.iconBtn}
			    iconStyle={style.booking}
				href={"https://www.booking.com/search.html?ss=" + address}
				target="_blank"
			>
				<ReactSVG path="https://upload.wikimedia.org/wikipedia/en/b/be/Booking.com_logo.svg" />
			</IconButton>
		);
	}
	
    render() {
        const { lat, lng, address } = this.props;
        
        return(
            <Dialog
                title="Accommodation"
                modal={false}
                contentStyle={style.contentStyle}
                open={this.props.accoDialogOpen}
                onRequestClose={this.props.closeAccoDialog}
            >
                <div>
                    {this.renderAirbnbButton(lat, lng)}
                    {this.renderBookingButton(address)}
                </div>
            </Dialog>
        );
    }    
}

export default EventAccommodationDialog;