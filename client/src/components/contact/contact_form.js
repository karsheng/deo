import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../helper/';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ReCAPTCHA from 'react-google-recaptcha';
import { openSnackbar } from '../../actions/snackbar_actions';
import { connect } from 'react-redux';

const style = {
	paper: {
		height: "100%",
		width: "100%",
		maxWidth: "768px",
		margin: "auto",
		marginTop: "20px",
		padding: "20px"
	},
	social: {
	    width: 36,
	    height: 36,
	    marginRight: 5
	}
};

class ContactForm extends Component {
    
    handleFormSubmit(formProps) {
        console.log(formProps);
        this.props.openSnackbar("Message sent!");
    }
    
    renderTextarea = (field) => {
      const { meta: { touched, error } } = field;
      return(
        <TextField hintText={field.label}
          floatingLabelText={field.label}
          errorText={touched && error}
          multiLine={true}
          rows={4}
          rowsMax={4}
          type={field.type}
          {...field.input}
        />
      );
    };
    
    // TODO: move sitekey to somewhere secure
    captcha(props) {
        return(
            <div>
                <ReCAPTCHA
                sitekey="6Lev6ywUAAAAAJJpKSyxaVYlPJF0vChvYaovTrs6"
                onChange={props.input.onChange}
                />
            </div>  
        );    
    }
    
    render() {
		const {handleSubmit, reset, submitting, pristine } = this.props;
		
        return(
            <Paper style={style.paper} zDepth={3}>
                <div className="row">
                    <h2 className="col-xs-12">Contact Us</h2>
                    <div className="col-xs-12 col-md-6">
                        <h3>Contact Details</h3>
                        <br />
                        <h4>
                        Tel: +603-8888 8888 <br /> 
                        Email: contact@deoxraces.com
                        </h4>
                        <h4>
                        123 Jalan Satu <br />
                        Taman Dua <br />
                        52200 Kuala Lumpur <br />
                        Malaysia
                        </h4>
                        <br />
                        <img style={style.social} src="https://image.freepik.com/free-icon/facebook-logo-button_318-84980.jpg"/>
                        <img style={style.social} src="https://image.freepik.com/free-icon/instagram-logo_318-84939.jpg" />
                        <img style={style.social} src="https://image.freepik.com/free-icon/twitter-logo-button_318-85053.jpg" />
                        <img style={style.social} src="https://image.freepik.com/free-icon/youtube-logo_318-76452.jpg" />
                        <br /><br /><br /><br />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <h3>Send us a message</h3>
                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        					<Field
        						label="Name"
        						type="text"
        						name="name"
        						component={renderField}
        					/>
        					<br />
        					<Field
        						label="Email"
        						type="email"
        						name="email"
        						component={renderField}
        					/>
        					<br />
        					<Field
        						label="Phone"
        						type="text"
        						name="phone"
        						component={renderField}
        					/>
        					<br />
        					<Field
        						label="Subject"
        						type="text"
        						name="subject"
        						component={renderField}
        					/>
        					<br />
        					<Field
        						label="Message"
        						type="text"
        						name="message"
        						component={this.renderTextarea}
        					/>
        					<Field name='captcharesponse' component={this.captcha}/>
        					<br /><br /><br /><br />
        					<RaisedButton
        						type="submit"
        						label="Submit"
        						disabled={pristine || submitting}
        						primary={true}
        					/>
                        </form>
                    </div>
                </div>
            </Paper>
        );
    }
}

function validate(formProps) {
    const errors = {};
    
    if (!formProps.name) {
        errors.name = "Please enter a name";
    }
    
    if (!formProps.email) {
        errors.email = "Please enter an email";
    }

    if (!formProps.phone) {
        errors.phone = "Please enter your phone number";
    }
    
    if (!formProps.subject) {
        errors.subject = "Please enter a subject";
    }

    
    if (!formProps.message) {
        errors.message = "Please enter a message";
    }
    
    if (!formProps.captcharesponse) {
        errors.captcharesponse = "Make sure you check the box";
    }
    
    return errors;
}

export default connect(null, { openSnackbar })(reduxForm({
    validate,
    form: 'contact'
})(ContactForm));