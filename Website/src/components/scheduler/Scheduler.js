import React from 'react';
import ScheduleForm from './SchedulerForm';
import { Redirect } from 'react-router-dom';
import * as actions from 'actions';
import { connect } from 'react-redux';
var errors = "";
/*Todo common event and Control function */
 class Scheduler extends React.Component {

  constructor() {
    super();
    this.state ={
      isValidate:undefined
    }

    this.schedule = this.schedule.bind(this);


  }

  componentWillMount() {
    const auditId = this.props.match.params.id;
    this.props.dispatch(actions.fetchAuditPlansById(auditId));
    this.props.dispatch(actions.fetchUserEmails())
  }
   

  schedule(auditData) {
    debugger;
    var emptyObject = isEmpty(auditData);
    if(!emptyObject)
    {
    if(auditData !== null && auditData.user_ids!=="" && auditData.length!==0){
      var user_array = "";
      this.setState({isValidate:true});
      var len = auditData.user_ids.length
      for(var x = 0; x<len; x++ ) {
        var new_array = auditData.user_ids[x].toString().split(',');
        if(user_array!==""){
        user_array = user_array +","+ new_array[0];
        }
        else {
          user_array = new_array[0];
        }

      }
      
      var data = {
        user_ids : user_array,
        status : "scheduled"
      }
    
    this.props.dispatch(actions.auditPlanUpdate(this.props.match.params.id,data));
    }
  }
    else{
      errors = "Please Enter the value"
      this.setState({isValidate:false});
    }
  
}
  render() {
    const { isEdited } = this.props.auditPlan;

    if(isEdited){
        return <Redirect to={{pathname:'/auditplanlist'}}/>
    }
    

    return (
      <div id ="page-content-wrapper">
    
      <nav aria-label="breadcrumb">
         <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-plus"/><span> Audit Add Data </span></li>
         </ol>
      </nav>
      { this.state.isValidate === false &&
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Please Enter the Auditors to Schedule!</strong> No Data Entered
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        }
      <section id='register'>
         <div className='bwm-form'>
            <div className='row'>
            
               <div className='col-md-5'>
               <div className="card">
              <div class="card-header">
               Scheduling
              </div>
              <div className = "card-body">
                  {/* 
                  <h1 className='page-title'>Create University Data</h1>
                  */}
                  <ScheduleForm submitCb={this.schedule}
                     options={this.props.auditPlan.emails}
                     options1 ={this.props.auditPlan.auditData}
                     errors={errors}/>
               </div>
               </div>
               </div>
               <div className='col-md-6 ml-auto'>
              <div className='image-container'>
                <h2 className='catchphrase'>This allows to put auditors on Schedule</h2>
                <img src={process.env.PUBLIC_URL + '/img/register-image.jpg'} alt=""/>
              </div>
            </div>
         </div>
         </div>
      </section>
    
   </div>

    )
  }
}
function isEmpty(obj) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
function mapStateToProps(state) {
  return {
    auditPlan: state.auditPlanList
  }
}

export default connect(mapStateToProps)(Scheduler)  

