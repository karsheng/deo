import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { closeSnackbar } from '../actions/snackbar_actions';

class SnackbarComponent extends Component {
    render() {
        return (
            <Snackbar
                message={this.props.message}
                open={this.props.open}
                autoHideDuration={4000}
                onRequestClose={this.props.closeSnackbar}
            />
        );
    }
}

function mapStateToProps(state) {
    const { open, message } = state.snackbar;

    return {
        open,
        message
    };
}

export default connect(mapStateToProps, { closeSnackbar })(SnackbarComponent);
