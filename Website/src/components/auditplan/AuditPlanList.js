import React, {Component} from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import * as actions from 'actions';
import { Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { ToastContainer, toast } from 'react-toastify';

class AuditPlanList extends React.Component {

    constructor() {
        super()
        this.state = {
            isDeleted : false 
        }

        this.options = {
            defaultSortName: '_id',  // default sort column name
            defaultSortOrder: 'desc'  // default sort order
          };

       
    }

    // Get the IDS in incremental order
    // Note that it won't sort the data
    indexN(cell, row, enumObject, index) {
        return (<div>{index+1}</div>) 
    }

    statusFormatter(cell) {
        debugger;
        if(cell === "scheduled"){
            return `<p style ='color:orange'>${cell}</p>`
        }
        else if(cell === "ongoing"){
            return `<p style ='color:green'>${cell}</p>`
        }
        else if(cell === "closed"){
            return `<p style ='color:red'>${cell}</p>`
        }
        else{
            return `<p style ='color:black'>${cell}</p>`
        }

    }
    // Lifecycle 
    componentWillMount() {
        this.props.dispatch(actions.fetchAuditPlans());
      }
    
    componentDidMount() {
        this.props.dispatch(actions.fetchAuditPlans());
      }
    
    
    handleInitialize(row){
        let path = `/auditplan/edit/${row._id}`;
       this.props.history.push(path);
    }
    
    deleteFromList(row) {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                this.props.dispatch(actions.auditDelete(row._id))
                this.setState({
                    isDeleted:true
                })
            }              
              },
              {
                label: 'No',
                onClick: () =>{ //alert('Click No')
                this.setState({
                    isDeleted:false
                })
            }
              }
            ]
          })


      }

      handleauditPlan(row){
        let path = `/scheduler/${row._id}`;
        this.props.history.push(path);
      }

      auditorsFormatter(cell){
          var newStr = cell.replace(/,/g, '-');
          return newStr;
      }
    

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <div className = "gridButtons">
            <button 
                type="button"
                className="btn btn-info react-bs-table-add-btn addbutton" 
                onClick={() => 
                this.handleInitialize(row)}
            >
            <span><i className="fa glyphicon glyphicon-pencil fa-pencil"></i> Edit</span>
            </button>
            <button 
            type="button"
            className="btn btn-danger react-bs-table-del-btn delbutton" 
            onClick={() => 
            this.deleteFromList(row)}>
            <span><i className="fa glyphicon glyphicon-trash fa-trash"></i> Delete</span>
         </button>
         <button 
            type="button"
            className="btn btn-warning react-bs-table-info-btn delbutton" 
            onClick={() => 
            this.handleauditPlan(row)}>
            <span><i className="fa glyphicon glyphicon-calendar fa-calendar"></i>Schedule</span>
         </button>
        </div>
        )
        }

    deleteButton(cell, row, enumObject, rowIndex) {
        return (
            <button 
                type="button"
                className="btn btn-warning react-bs-table-del-btn" 
                onClick={() => 
                this.handleDelete(row)}
            >
            <span><i className="fa glyphicon glyphicon-trash fa-trash"></i> Delete</span>
            </button>  
        )
    }


    render() {
        const {isDeleted } = this.state;
        return (
            <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page"><i className="fa fa-list"/><span> Auditing List </span></li>
            </ol>
            </nav>
            <div className="col-md-12">
            { isDeleted &&
          <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Deleted!</strong> You have successfully Deleted the data.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        }   
            <BootstrapTable data={this.props.auditplans.data} striped={true} hover={true} pagination={true} search={ true } multiColumnSearch={ true } exportCSV={true} options={this.options}>
            <TableHeaderColumn isKey dataField='_id' dataSort hidden={true} >ID</TableHeaderColumn>
            <TableHeaderColumn  dataField='test' dataSort hidden={false} dataFormat={this.indexN} >ID</TableHeaderColumn>
            <TableHeaderColumn dataField='NextAuditDate'>Next Date</TableHeaderColumn>
            <TableHeaderColumn dataField='RiskFactor' dataSort = {true}>Risk Factor</TableHeaderColumn>
            <TableHeaderColumn dataField='RiskLevel'>Risk Level</TableHeaderColumn>
            <TableHeaderColumn dataField='DaysRequired'>Days</TableHeaderColumn>
            <TableHeaderColumn dataField='ElapsedMonths'>Months</TableHeaderColumn>
            <TableHeaderColumn dataField='createdAt' tdStyle={ { whiteSpace: 'normal' } }>Creation Date</TableHeaderColumn>
            <TableHeaderColumn dataField='AuditArea' tdStyle={ { whiteSpace: 'normal' } }>AuditArea</TableHeaderColumn>
            <TableHeaderColumn dataField='status' dataFormat={this.statusFormatter}>Status</TableHeaderColumn>
            <TableHeaderColumn dataField='user_ids' tdStyle={ { whiteSpace: 'normal' } } dataFormat={this.auditorsFormatter}>Auditors</TableHeaderColumn>
            <TableHeaderColumn dataField="button" dataFormat={this.cellButton.bind(this)}>Buttons</TableHeaderColumn>
            </BootstrapTable>

            </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
      auditplans: state.auditPlanList
    }
  }

export default connect(mapStateToProps)(AuditPlanList)  