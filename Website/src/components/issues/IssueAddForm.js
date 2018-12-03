import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmSelect } from 'components/shared/form/BwmSelect';
import { BwmTextArea } from 'components/shared/form/BwmTextArea';
import { BwmResError } from 'components/shared/form/BwmResError';
import { BwmDatePicker } from 'components/shared/form/BwmDatePicker';
import { required } from 'components/shared/form/validators';

const IssueAddForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options,options1,options2, errors } = props
  

  return (
    <form onSubmit={handleSubmit(submitCb)}>
     <BwmResError errors={errors} />
       <Field
        name="Recommendation"
        type="text"
        label='Recommendation'
        rows = '6'
        className='form-control form-control-lg'
        component={BwmTextArea}
        validate={[required]}/>
       <Field
       options = {options}
        name="status"
        type="text"
        label='Status'
        className='form-control form-control-lg'
        component={BwmSelect}
        validate={[required]}
      />
      <Field
       options = {options1}
        name="RiskLevel"
        type="text"
        label='Risk Level'
        className='form-control form-control-lg'
        component={BwmSelect}
        validate={[required]}/>
      <Field
        name="ManagementResponse"
        type="text"
        label='ManagementResponse'
        rows = "6"
        className='form-control form-control-lg'
        component={BwmTextArea}
        validate={[required]}
      />
      {/* <Field
        name="CompletionDate"
        inputValueFormat="YYYY-MM-DD"
        dateFormat="L"
        dateFormatCalendar="dddd"
        fixedHeight
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        normalize={value => (value ? moment(value).format('YYYY-MM-DD') : null)}
        component={BwmDatePicker}
      /> */}
      <Field
       name = "CompletionDate"
       label = "Completion Date"
       className = "form-control form-control-lg"
       showTime = {false}
       component = {BwmDatePicker}
       />
      <Field
        options = {options2}
        name="AssignedTo"
        type="text"
        label='Assigned To'
        className='form-control form-control-lg'
        component={BwmSelect}
        validate={[required]}
      />

      <Field
        options = {options2}
        name="IssueManager"
        type="text"
        label='Issue Manager'
        className='form-control form-control-lg'
        component={BwmSelect}
        validate={[required]}
      />
      {/* <Field
        name="RevisedCompletionDate"
        inputValueFormat="YYYY-MM-DD"
        dateFormat="L"
        dateFormatCalendar="dddd"
        fixedHeight
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        normalize={value => (value ? moment(value).format('YYYY-MM-DD') : null)}
        component={BwmDatePicker}
      /> */}
      <Field
       name = "RevisedCompletionDate"
       label = 'Revised Completion Date'
       className = "form-control form-control-lg"
       showTime = {false}
       component = {BwmDatePicker}
       />
      <Field
        name="FollowUpTesting"
        type="text"
        label='Follow Up Testing'
        className='form-control form-control-lg'
        component={BwmInput}
        validate={[required]}
      />
      {/* <Field
        name="ImplementationDate"
        inputValueFormat="YYYY-MM-DD"
        dateFormat="L"
        dateFormatCalendar="dddd"
        fixedHeight
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        normalize={value => (value ? moment(value).format('YYYY-MM-DD') : null)}
        component={BwmDatePicker}
      /> */}
      <Field
       name = "ImplementationDate"
       label = "Implementation Date"
       className = "form-control form-control-lg"
       showTime = {false}
       component = {BwmDatePicker}
       />
      <Field
        name="ClosedDate"
        label = "Closed Date"
        className = "form-control form-control-lg"
        showTime = {false}
        component = {BwmDatePicker}
      />
      
    
      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Create Issue Data
      </button>
    </form>
  )
}

export default reduxForm({
  form: 'IssueAddForm',
})(IssueAddForm)