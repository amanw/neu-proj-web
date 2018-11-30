import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmSelect } from 'components/shared/form/BwmSelect';
// import Multiselect from 'react-widgets/lib/Multiselect';
// import 'react-widgets/dist/css/react-widgets.css';
import { BwmResError } from 'components/shared/form/BwmResError';
import { required } from 'components/shared/form/validators';
import { connect } from 'react-redux';


let AuditPlanEditForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options,options1,options2, errors,Risk,ResidualLevel } = props
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
    <div className= "col">
    {/* <Field
       data = {options1}
        name="Month"
        type="text"
        label='Next Audit test'
        className='form-control form-control-lg'
        defaultValue={[]}
        onBlur={() => props.onBlur()}
        component={Multiselect}
        validate={[required]}
      /> */}
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
      <Field
       options = {options2}
        name="status"
        type="text"
        label='Status'
        className='form-control form-control-lg'
        component={BwmSelect}
        validate={[required]}
      />
    
      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Edit Audit Plan
      </button>
      <BwmResError errors={errors} />
      
    </form>
  )
}

//defining the redux form
AuditPlanEditForm = reduxForm({

  form: 'AuditPlanEditForm',

  enableReinitialize: true

})(AuditPlanEditForm)


AuditPlanEditForm = connect(

  state => ({

    initialValues: state.auditPlanList.auditData 

  })
)(AuditPlanEditForm)

export default AuditPlanEditForm;
