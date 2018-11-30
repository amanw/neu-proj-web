import React from 'react';

export function BwmSimpleError(props) {
  debugger;
  let errors = props.errors;
  if (typeof errors != "undefined") {
  return (
   errors.length > 0 && <div className='alert alert-danger bwm-res-errors'>{errors}</div>
  )
  }
  else {
    return (null);
  }

}
