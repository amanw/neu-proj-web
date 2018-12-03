import React from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocaliser from 'react-widgets-moment'
import 'react-widgets/dist/css/react-widgets.css'
momentLocaliser(moment)

// export const BwmDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
//   <div>
//         <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
//         {touched && error && <span>{error}</span>}
//   </div>
// );

export const BwmDatePicker = ({ input: { onChange, value }, showTime,label, className, symbol, meta: { touched, error, warning } }) =>(
  <div className='form-group'>
    <label>{label}</label>
    <div className='input-group'>
      { symbol &&
        <div className='input-group-prepend'>
          <div className='input-group-text'>{symbol}</div>
        </div>
      }
      <DateTimePicker
        onChange={onChange}
        format="MM/DD/YYYY"
        time={showTime}
        className = {className}
        value={!value ? null : new Date(value)}
  />
    </div>
      {touched &&
        ((error && <div className='alert alert-danger'>{error}</div>))}
  </div>
  
)