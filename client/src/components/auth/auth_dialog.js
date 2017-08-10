import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import { connect } from "react-redux";
import { closeAuthDialog } from "../../actions/auth_actions";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";

const style = {
  contentStyle: {
    maxWidth: "300px"
  },
  signinBtn: {
      margin: "16px auto"
  }
};

class AuthDialog extends Component {
  render() {
    return (
        <Dialog
          title="Sign in to register!"
          modal={false}
          open={this.props.authDialogOpen}
          contentStyle={style.contentStyle}
          onRequestClose={this.props.closeAuthDialog}
          autoScrollBodyContent={true}
        >
            <br />
            <RaisedButton 
                primary={true} 
                label="Sign In"
                fullWidth={true}
                style={style.signinBtn}
                containerElement={<Link to="/signin" />}
                onTouchTap={this.props.closeAuthDialog}
            />
            <RaisedButton 
                secondary={true} 
                label="or sign up here"
                fullWidth={true}
                containerElement={<Link to="/signup" />}
                onTouchTap={this.props.closeAuthDialog}
            />
        </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    authDialogOpen: state.auth.authDialogOpen,
    errorMessage: state.auth.signinError
  };
}

export default connect(mapStateToProps, { closeAuthDialog })(AuthDialog);
