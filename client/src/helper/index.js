import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

export const formatDate = (datetime) => {

	const date = new Date(datetime);
	 
  const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
};

export const getTime = (datetime) => {
  const date = new Date(datetime);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return formatTime(hours) + ':' + formatTime(minutes);

  function formatTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
}


export const renderMenuItem = (itemArray) => {
  return itemArray.map(itemValue => {
    return <MenuItem key={itemValue} value={itemValue} primaryText={itemValue} />
  });
};

export const renderRadioGroup = ({ input, meta: { touched, error }, ...rest }) => {
  return(
    <div>
      <RadioButtonGroup
        {...input}
        {...rest}
        valueSelected={input.value}
        onChange={(event, value) => input.onChange(value)}
      />
      <div className="error-text">{renderErrorText(touched, error)}</div>
    </div>
  );
}

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  multiple,
  ...custom
}) => (
  <SelectField
    multiple={multiple}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);

export const renderDatePicker = ({ input, label, meta: { touched, error }, ...custom }) => {
  return (
    <div>
      <DatePicker
        onChange={(e, val) => {return input.onChange(val)}}
        {...custom}
        value={(input.value) ? input.value : {}}
      />
      <div className="error-text">{renderErrorText(touched, error)}</div>
    </div>
    

  );
};

export const renderField = (field) => {
  const { meta: { touched, error } } = field;
  return(
    <TextField hintText={field.label}
      floatingLabelText={field.label}
      errorText={touched && error}
      type={field.type}
      {...field.input}
    />
  );
};

function renderErrorText(touched, error) {
  if (touched) {
    return (error);
  }
}

export const participantFormCompleted = (participant) => {
  const {
    registerForSelf,
    fullName,
    email,
    identityNumber,
    gender,
    nationality,
    countryOfResidence,
    phone,
    postcode,
    apparelSize,
    dateOfBirth,
    emergencyContact,
    medicalCondition
  } = participant;

  let medicalConditionCheck = false;
  if (medicalCondition) {
    if (medicalCondition.yes === true) {
      if (medicalCondition.description) {
        medicalConditionCheck = true  
      }
    } else {
      medicalConditionCheck = true
    }
  }

  const genderCheck = gender !== undefined ? true : false;
  const registerForSelfCheck = registerForSelf !== undefined ? true : false;

  return (
    registerForSelfCheck &&
    fullName &&
    email &&
    identityNumber &&
    genderCheck &&
    nationality &&
    countryOfResidence &&
    phone &&
    postcode &&
    apparelSize &&
    dateOfBirth &&
    emergencyContact.name &&
    emergencyContact.relationship &&
    emergencyContact.phone && 
    medicalConditionCheck
  );
}


export const calculateAge = (dateOfBirth) => {
  const ageDifMs = Date.now() - new Date(dateOfBirth);
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}