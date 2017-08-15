import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import ReactSVG from "react-svg";
import IconButton from "material-ui/IconButton";

const style = {
  contentStyle: {
    maxWidth: "300px"
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
	renderAirbnbButton(address) {
		return (
			<IconButton
			    style={style.iconBtn}
			    iconStyle={style.airBnb}
				href={"https://airbnb.com/s/" + address}
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
        const { address } = this.props;
        
        return(
            <Dialog
                title="Accommodation"
                modal={false}
                contentStyle={style.contentStyle}
                open={this.props.accoDialogOpen}
                onRequestClose={this.props.closeAccoDialog}
            >
                <div>
                    {this.renderAirbnbButton(address)}
                    {this.renderBookingButton(address)}
                </div>
            </Dialog>
        );
    }    
}

export default EventAccommodationDialog;