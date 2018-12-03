import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmSelect } from 'components/shared/form/BwmSelect';
import { BwmTextArea } from 'components/shared/form/BwmTextArea';
import { BwmResError } from 'components/shared/form/BwmResError';
import { required } from 'components/shared/form/validators';

const UniversityAddForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options,options1, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
       <Field
       options = {options}
        name="UniversityArea"
        type="text"
        label='University Area'
        className='form-control form-control-lg'
        component={BwmSelect}
        validate={[required]}
      />
      <Field
        options = {options1}
        name="Owner"
        type="text"
        label='Owner'
        className='form-control form-control-lg'
        component={BwmSelect}
        validate={[required]}
      />
      <Field
        name="AuditArea"
        type="text"
        label='Audit Area'
        className='form-control form-control-lg'
        component={BwmInput}
        validate={[required]}
      />
      <Field
        name="Description"
        type="text"
        label='Description'
        rows = '6'
        className='form-control form-control-lg'
        component={BwmTextArea}
        validate={[required]}
      />
    
      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Create Unversity Data
      </button>
      <BwmResError errors={errors} />
    </form>
  )
}

export default reduxForm({
  form: 'universityAddForm',
})(UniversityAddForm)