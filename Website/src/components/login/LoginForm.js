import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmResError } from 'components/shared/form/BwmResError';
import { required, minLength4 } from 'components/shared/form/validators';

const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        type="email"
        label='Email'
        className='user_login'
        component={BwmInput}
        validate={[required]}
      />
      <Field
        name="password"
        type="password"
        label='Password'
        className='user_pass'
        component={BwmInput}
        validate={[required]}
      />
    <div className = "form-group">
      <button className='btn btn-bwm btn-form btn-login' type="submit" disabled={!valid || pristine || submitting}>
        Login
      </button>
      </div>
      <BwmResError errors={errors} />
    </form>
  )
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm)
