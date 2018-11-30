import React from 'react';
import AuditplanForm from './AuditplanForm';
import { Redirect } from 'react-router-dom';
import * as actions from 'actions';
import { connect } from 'react-redux';
var prev_value = 0;
var next_value = 0;
var res_value = 0;
var prev_controlled_value=0;
var next_controlled_value=0;
/*Todo common event and Control function */
const re = RegExp('^(?:[0-9]|0[1-9])$');
 class Auditplan extends React.Component {

  constructor() {
    super();
    this.state = {
      InheritedRisk:0,
      ControlledRisk:0,
      ResidualRisk:0,
      InheritedColor:"",
      InheritedLevel:"",
      ControlledColor:"",
      ControlledLevel:"",
      ResidualColor:"",
      ResidualLevel:""
    }
    this.updateInput = this.updateInput.bind(this);
    this.updateComplexity = this.updateComplexity.bind(this);
    this.updateFinancing = this.updateFinancing.bind(this);
    this.updateInternal = this.updateInternal.bind(this);
    this.updateLastAudit = this.updateLastAudit.bind(this);
    this.handleRisk = this.handleRisk.bind(this);
    this.auditplanAdd = this.auditplanAdd.bind(this);
    this.updateResidualRisk();
    this.auditYears = ['Select','2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030'];
    this.auditMonths = ['Select','Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];

  }

  auditplanAdd(auditData) {
    var data = {
      LastAuditDate: "",
      NextAuditDate: auditData.Month + "-" + auditData.Year,
      RiskFactor: auditData.RiskFactor,
      RiskLevel: auditData.RiskLevel,
      DaysRequired: auditData.DaysRequired,
      ElapsedMonths: auditData.ElapsedMonths,
      status:"planned",
      unversitydata_id: this.props.match.params.id
    }
    console.log(JSON.stringify(data));
    this.props.dispatch(actions.auditAdd(data));
  }
 updateResidualRisk(){
   debugger;
   if(prev_value>0 || next_value>0 || prev_controlled_value>0 || next_controlled_value>0 || res_value>0){
    var res  = prev_value + next_value + res_value + prev_controlled_value + next_controlled_value;
   this.setState({ResidualRisk:res});
   this.updateResidualLevelAndColor(res);
   }
 }
 handleRisk(){
   debugger;
  var res = this.state.InheritedRisk + this.state.ControlledRisk;
  this.setState({ResidualRisk:res});
  this.updateResidualLevelAndColor(res);
 }

  updateInternal(event){
    var val = parseInt(event.target.value);
    if(event.target.value != ""  && re.test(val))
    {
      var res = parseInt(this.state.ControlledRisk);
      var sum = val + res;
      this.updateControlledLevelAndColor(sum);
      this.setState({ControlledRisk:sum});
      prev_controlled_value = parseInt(event.target.value);
      this.updateResidualRisk();
    }
    else{
      this.setState({ControlledLevel: ""})
      prev_controlled_value = 0;
      var new_sum = next_controlled_value + prev_controlled_value;
      this.setState({ControlledRisk:new_sum});
    }

  }

  updateLastAudit(event){
    var val = parseInt(event.target.value);
    if(event.target.value != "" && re.test(val))
    {
      var res = parseInt(this.state.ControlledRisk);
      var sum = val + res;
      this.updateControlledLevelAndColor(sum);
      this.setState({ControlledRisk:sum});
      next_controlled_value = parseInt(event.target.value);
      this.updateResidualRisk();
    }
    else{
      this.setState({ControlledLevel: ""})
      next_controlled_value = 0;
      var new_sum = next_controlled_value + prev_controlled_value;
      this.setState({ControlledRisk:new_sum});
      
    }
  }
  updateResidualLevelAndColor(value){
    if(value >= 22)
    {
      this.setState({ResidualLevel:"High",ResidualColor:"red"});
    }
    else if((value >= 14) && (value <=21)) 
    {
      this.setState({ResidualLevel:"Med",ResidualColor:"orange"});
    }
    else if(value <14)
     {
       this.setState({ResidualLevel:"Low",ResidualColor:"green"});
     }
  }
  updateControlledLevelAndColor(value){
    if(value >= 8)
    {
      this.setState({ControlledLevel:"High"});
      this.setState({ControlledColor:"red"});
    }
    else if((value >= 4) && (value <=7)) 
    {
      this.setState({ControlledLevel:"Med"})
      this.setState({ControlledColor:"orange"});
    }
    else if(value <4)
     {
       this.setState({ControlledLevel:"Low"});
       this.setState({ControlledColor:"green"});
     }

  }
  updateInheritedLevelAndColor(value){
    if(value >= 12)
    {
      this.setState({InheritedLevel:"High"});
      this.setState({InheritedColor:"red"});
    }
    else if((value >= 8) && (value <=11)) 
    {
      this.setState({InheritedLevel:"Med"})
      this.setState({InheritedColor:"orange"});
    }
    else if(value <8)
     {
       this.setState({InheritedLevel:"Low"});
       this.setState({InheritedColor:"green"});
     }
  }
  
  updateInput(event){
    debugger;
    var val = parseInt(event.target.value);
    if(event.target.value != "" && re.test(val))
    {
      
      var res = parseInt(this.state.InheritedRisk);
      var sum = val + res;
      this.updateInheritedLevelAndColor(sum);
      this.setState({InheritedRisk:sum});
      prev_value = parseInt(event.target.value);
       this.updateResidualRisk();
    }
    else{
      this.setState({InheritedLevel: ""})
      prev_value = 0;
      // this.setState({Reputation:0})
      var new_sum = next_value + res_value;
      this.setState({InheritedRisk:new_sum});
      //this.updateResidualRisk();
    }
   
  }
  updateComplexity(event){
    var val = parseInt(event.target.value);
    if(event.target.value != "" && re.test(val))
    {
    
    var res = parseInt(this.state.InheritedRisk);
    var sum = val + res;
    this.updateInheritedLevelAndColor(sum);
    this.setState({InheritedRisk:sum});
    next_value = parseInt(event.target.value);
    this.updateResidualRisk();
    }
    else {
      next_value=0;
      var new_sum = prev_value + res_value;
      this.setState({InheritedRisk:new_sum});
      //this.updateResidualRisk();
    }
  }
  updateFinancing(event){
    var val = parseInt(event.target.value);
    if(event.target.value != "" && re.test(val))
    {
      
      var res = parseInt(this.state.InheritedRisk);
      var sum = val + res;
      this.updateInheritedLevelAndColor(sum);
      this.setState({InheritedRisk:sum});
      res_value = parseInt(event.target.value);
      this.updateResidualRisk();
    }
    else {
      res_value=0;
      var new_sum = next_value + prev_value;
      this.setState({InheritedRisk:new_sum});
      //this.updateResidualRisk();
    }
  }
  render() {
    const { isAdded, errors } = this.props.auditPlan;
    // if (this.props.universities.redirectAdd) {
    //     return <Redirect to={{pathname:'/university'}}/>
    //   }
    if(isAdded){
        return <Redirect to={{pathname:'/auditplanlist'}}/>
    }

    return (
      <div id ="page-content-wrapper">
      <nav aria-label="breadcrumb">
         <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-plus"/><span> Audit Add Data </span></li>
         </ol>
      </nav>
      
      <section id='register'>
         <div className='bwm-form'>
            <div className='row'>
            
               <div className='col-md-5'>
               <div className="card">
              <div class="card-header">
              Audit Plannning
              </div>
              <div className = "card-body">
                  {/* 
                  <h1 className='page-title'>Create University Data</h1>
                  */}
                  <AuditplanForm submitCb={this.auditplanAdd}
                     options={this.auditYears}
                     options1 ={this.auditMonths}
                     errors={errors}
                     Risk = {this.state.InheritedRisk + this.state.ControlledRisk}
                     ResidualLevel = {this.state.ResidualLevel}/>
               </div>
               </div>
               </div>
               <div className='col-md-6 ml-auto'>
               <div className="card">
                <div class="card-header">
                Risk Assessment
                </div>
                <div className="card-body">
                  <div className='container'>
                     <table class="table table-bordered table-light default-table">
                        <thead>
                           <tr>
                              <th scope="col">Inherent Risk</th>
                              <th scope="col">Evaluation</th>
                              <th scope="row">Total</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <th scope="row">University Reputation</th>
                              
                                 <input  type="number" onChange={this.updateInput} ></input>
                              
                           </tr>
                           <tr>
                              <th scope="row">Complexity</th>
                              <input type="number" onChange={this.updateComplexity} ></input>
                              <td><p style={{color:this.state.InheritedColor}}>{this.state.InheritedLevel}</p></td>
                           </tr>
                           <tr>
                              <th scope="row">Financial Exposure</th>
                              <input type="number" onChange={this.updateFinancing} ></input>
                           </tr>
                           <tr>
                              <th scope="row">Total</th>
                              <input type="number" value={this.state.InheritedRisk} disabled="disabled"></input>
                           </tr>
                        </tbody>
                     {/* </table> */}
                     {/* <table class="table table-bordered table-dark"> */}
                        <thead>
                           <tr>
                              <th scope="col">Controlled Risk</th>
                              <th scope="col">Evaluation</th>
                              <th scope="row">Total</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <th scope="row">Internal Controls</th>
                                 <input  type="number" onChange={this.updateInternal}></input>
                           </tr>
                           <tr>
                              <th scope="row">Date of Last Audit</th>
                              <input type="number" onChange={this.updateLastAudit}></input>
                              <td><p style={{color:this.state.ControlledColor}}>{this.state.ControlledLevel}</p></td>
                           </tr>
                           <tr>
                              <th scope="row">Total</th>
                              <input type="number" value={this.state.ControlledRisk} disabled="disabled"></input>
                           </tr>
                        </tbody>
                        <thead>
                           <tr>
                              <th scope="col">Residual Risk</th>
                              <th scope="col"><input  type="number" value={this.state.InheritedRisk + this.state.ControlledRisk} disabled="disabled"></input></th>
                              <th><p style={{color:this.state.ResidualColor}}>{this.state.ResidualLevel}</p></th>
                           </tr>
                        </thead>
                     </table>
                  </div>
               </div>
            </div>
         </div>
         </div>
         </div>
      </section>
    
   </div>

    )
  }
}
function mapStateToProps(state) {
  return {
    auditPlan: state.auditPlan,
    risk: this.state
  }
}

export default connect(mapStateToProps)(Auditplan)  

