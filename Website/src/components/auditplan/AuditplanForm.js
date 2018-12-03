import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmSelect } from 'components/shared/form/BwmSelect';
import { BwmResError } from 'components/shared/form/BwmResError';
import { required } from 'components/shared/form/validators';


let AuditPlanForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options,options1, errors,Risk,ResidualLevel } = props
  if (Risk) {
    props.change('RiskFactor', Risk);
  }
  if(ResidualLevel) {
    props.change('RiskLevel',ResidualLevel)
  }

  if(options) {
  }
 
  return (
    <form onSubmit={handleSubmit(submitCb)}>
    <div class="panel panel-default">
    <div className="row">
    <div className= "col">
    <Field
       options = {options1}
        name="Month"
        type="text"
        label='Next Audit Month'
        className='form-control form-control-lg'
        component={BwmSelect}
        validate={[required]}
      />
      </div>
      <div className = "col">
      <Field
       options = {options}
        name="Year"
        type="text"
        label='Next Audit Year'
        className='form-control form-control-lg'
        component={BwmSelect}
        validate={[required]}
      />
      </div>
      </div>
      </div>
      <Field
        name="DaysRequired"
        type="number"
        label='Days Required'
        className='form-control form-control-lg'
        component={BwmInput}
        validate={[required]}
      />
      <Field
        name="ElapsedMonths"
        type="number"
        label='Elapse Months'
        className='form-control form-control-lg'
        component={BwmInput}
        validate={[required]}
      />
      <Field
        name="RiskFactor"
        type="number"
        label='Risk Factor'
        className='form-control form-control-lg'
        component={BwmInput}
        validate={[required]}
      />
      <Field
        name="RiskLevel"
        type="text"
        label='Risk Level'
        className='form-control form-control-lg'
        component={BwmInput}
        validate={[required]}
      />
    
      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Create Audit Plan
      </button>
      <BwmResError errors={errors} />
      
    </form>
  )
}

//defining the redux form
AuditPlanForm = reduxForm({

  form: 'AuditPlanForm',

  // enableReinitialize: true

})(AuditPlanForm)


// AuditPlanForm = connect(

//   state => ({

//     initialValues: state.auditPlan.auditData 

//   })
// )(AuditPlanForm)

export default AuditPlanForm;
