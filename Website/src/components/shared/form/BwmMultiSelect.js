import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

export const BwmMultiSelect = ({
  input,
  label,
  options,
  className,
  meta: { touched, error, warning },
  ...rest
}) => {

//   function renderOptions() {

//     return options.map((option, index) => {
//       return <option key={index} value={option}> {option} </option>
//     });
//   }

  return (
    <div className='form-group'>
      <label>{label}</label>
      <div className='input-group'>
        <Multiselect {...input} className={className}
        onBlur={() => input.onBlur()} 
        value={input.value || []} // requires value to be an array
        {...rest}
        />
        {/* </Multiselect> */}
      </div>
        {touched &&
          ((error && <div className='alert alert-danger'>{error}</div>))}
    </div>
  )
}
