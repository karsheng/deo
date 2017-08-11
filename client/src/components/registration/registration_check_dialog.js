import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { updateParticipantInfo } from '../../actions/participant_actions';

const style = {
  contentStyle: {
    maxWidth: "300px"
  },
  selfBtn: {
      margin: "16px auto"
  },
  h5: {
      textAlign: "center"
  }
};


// TODO: to speed us testing. delete this after development
const fakeParticipant = {
  self: "yes",
  fullName: "Gavin Belson",
  email: "gavin@hooli.com",
  identityNumber: "12345678",
  male: "male",
  nationality: "Malaysia",
  countryOfResidence: "Malaysia",
  phone: "1234567",
  postcode: "1235456",
  apparelSize: "M",
  dateOfBirth: new Date(1968,1,1),
  emergencyContactName: "Richard Hendricks",
  emergencyContactPhone: "123475953",
  relationship: "123475953",
  withMedicalCondition: "yes",
  medicalConditionDescription: "High colestrol because of blood boy",
  wantsPostalService: true,
  line1: "123 Hooli Road",
  line2: "Silicon Valley",
  line3: "Palo Alto",
  postalCity: "San Francisco",
  postalState: "Others",
  postalPostcode: "12345",
  postalCountry: "United States"
};

class RegistrationCheckDialog extends Component {
    
    handleSelfRegistration() {
        this.props.updateParticipantInfo(fakeParticipant);
        this.props.closeRegCheckDialog();
        this.props.history.push("/registration/participant/" +  this.props.match.params._id);
    }
    
    handleOthersRegistration() {
        const participant = {
            self: "others"
        };
        
        this.props.updateParticipantInfo(participant);
        this.props.closeRegCheckDialog();
        this.props.history.push("/registration/participant/" +  this.props.match.params._id);
    }
    
    render() {
        return(
            <Dialog
                title="Are you registering for yourself or others?"
                modal={false}
                contentStyle={style.contentStyle}
                open={this.props.regCheckDialogOpen}
                onRequestClose={this.props.closeRegCheckDialog}
                autoScrollBodyContent={true}
            >
                <br />
                <RaisedButton 
                    primary={true} 
                    label="Self"
                    fullWidth={true}
                    style={style.selfBtn}
                    onTouchTap={this.handleSelfRegistration.bind(this)}
                />
                <RaisedButton 
                    secondary={true} 
                    label="Others"
                    fullWidth={true}
                    onTouchTap={this.handleOthersRegistration.bind(this)}
                />
                <Link to="/profile"><h5 style={style.h5}>Or update profile for faster registration in future!</h5></Link>
            </Dialog>
        );
    }    
}


export default connect(null, { updateParticipantInfo })(withRouter(RegistrationCheckDialog));