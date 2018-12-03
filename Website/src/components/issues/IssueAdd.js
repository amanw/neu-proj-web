import React from 'react';
import IssueAddForm from './IssueAddForm';
import { Redirect } from 'react-router-dom';
import * as actions from 'actions';
import { connect } from 'react-redux';

 class IssueAdd extends React.Component {

  constructor() {
    super();

    this.issueAdd = this.issueAdd.bind(this);
    this.statusDropdown = ['Select','Closed, Accept Risk','Closed, Mitigated','Closed, Mitigation in Process','Closed, No Follow-Up','Delete','Issue Noted','Issue Noted After Follow-Up','Removed – Combined With Other Issue','Removed – Issue No Longer Exists',' To Be Discussed'];
    this.risks = ['Select','High','Medium','Low','Observation'];
  }

  componentWillMount() {
    // const issueId = this.props.match.params.id;
    this.props.dispatch(actions.IssueUserEmails());
  }

  issueAdd(issueData) {
    debugger;
    var newData = {
      Recommendation: issueData.Recommendation,
      status: issueData.status,
      RiskLevel: issueData.RiskLevel,
      ManagementResponse: issueData.ManagementResponse,
      CompletionDate: issueData.CompletionDate? issueData.CompletionDate:"",
      AssignedTo: issueData.AssignedTo? issueData.AssignedTo:"",
      IssueManager: issueData.IssueManager? issueData.IssueManager:"",
      RevisedCompletionDate: issueData.RevisedCompletionDate? issueData.RevisedCompletionDate:"",
      FollowUpTesting: issueData.FollowUpTesting,
      ImplementationDate: issueData.ImplementationDate? issueData.ImplementationDate:"",
      ClosedDate: issueData.ClosedDate? issueData.ClosedDate:"",
      auditId: this.props.match.params.id
    }
    console.log(JSON.stringify(newData));
    this.props.dispatch(actions.issuesAdd(newData));
  }

  render() {
    if (this.props.issueAdd.isAdded) {
        return <Redirect to={{pathname:'/issues'}}/>
      }

    return (
      <div id ="page-content-wrapper">
      <div className = "container-fluid">
      <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-plus"/><span> Issue Add Data </span></li>
      </ol>
      </nav>
      <section id='issue'>
        <div className='bwm-form'>
          <div className='row'>
            <div className='col-md-5'>
            <IssueAddForm submitCb={this.issueAdd}
                                options={this.statusDropdown}
                                options1 ={this.risks}
                                options2 = {this.props.issueUser.emails}
                                errors={this.props.issueAdd.errors}/>
              
            </div>
            <div className='col-md-6 ml-auto'>
              <div className='image-container'>
                <h2 className='catchphrase'>This is how you will create a new Unversity to add to the Audit Plan.</h2>
                {/* <img src={process.env.PUBLIC_URL + '/img/register-image.jpg'} alt=""/> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    issueUser:state.issueUser,
    issueAdd: state.issueAdd
  }
}

export default connect(mapStateToProps)(IssueAdd)  

