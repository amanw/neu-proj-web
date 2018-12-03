import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmResError } from 'components/shared/form/BwmResError';
import {BwmMultiSelect} from 'components/shared/form/BwmMultiSelect';
 import { required } from 'components/shared/form/validators';



let SchedulerForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, options,valid, errors } = props

  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        data = {options}
        name="user_ids"
        label='Schedule Auditors to Audit'
        className='form-control form-control-lg'
        defaultValue={options}
        component={BwmMultiSelect}
        validate={[required]}

      /> 
    
      <button className='btn btn-bwm btn-form' type="submit" disabled={submitting || pristine || !valid} >
        Schedule
      </button>
      <BwmResError errors={errors} />
      
    </form>
  )
}

//defining the redux form
SchedulerForm = reduxForm({

  form: 'SchedulerForm',

 enableReinitialize: true

})(SchedulerForm)


// AuditPlanEditForm = connect(

//   state => ({

//     initialValues: state.auditPlanList.auditData 

//   })
// )(AuditPlanEditForm)

export default SchedulerForm;
