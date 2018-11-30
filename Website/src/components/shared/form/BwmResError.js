import React from 'react';

export function BwmResError(props) {
  debugger;
  let errors = props.errors;
  if (typeof errors != "undefined") {
  return (
   errors.length > 0 && <div className='alert alert-danger bwm-res-errors'>{errors.map((error, index) => <p key={index}> {error.detail} </p>)}</div>
  )
  }
  else {
    return (null);
  }

}
