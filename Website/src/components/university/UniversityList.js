import React, {Component} from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import * as actions from 'actions';
import { Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { ToastContainer, toast } from 'react-toastify';

class UniversityList extends React.Component {

    constructor() {
        super()
        this.routeChange = this.routeChange.bind(this);
        this.state = {
            isDeleted : false 
        }

        this.options = {
            defaultSortName: '_id',  // default sort column name
            defaultSortOrder: 'desc'  // default sort order
          };

       
    }
    componentWillMount() {
        this.props.dispatch(actions.fetchUniversities());
      }

    routeChange() {
        let path = '/university/new';
        this.props.history.push(path);
        }
    
    handleInitialize(row){
       let path = `/university/${row._id}`;
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
                this.props.dispatch(actions.universityDelete(row._id)) 
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
        debugger;
        let path = `/auditplan/new/${row._id}`;
        this.props.history.push(path);
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
            className="btn btn-info react-bs-table-info-btn delbutton" 
            onClick={() => 
            this.handleauditPlan(row)}>
            <span><i className="fa glyphicon glyphicon-tasks fa-tasks"></i> Audit Plan</span>
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
                <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-university"/><span> University Data </span></li>
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
            <button type="button" className="btn btn-info react-bs-table-add-btn addbutton" onClick = {this.routeChange}><span><i className="fa glyphicon glyphicon-plus fa-plus"></i> New</span></button>
            
            <BootstrapTable data={this.props.universities.data} striped={true} hover={true} pagination={true} search={ true } multiColumnSearch={ true } exportCSV={true} options={this.options}>
            <TableHeaderColumn isKey dataField='_id' hidden={true}>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='University'>University</TableHeaderColumn>
            <TableHeaderColumn dataField='UniversityArea' dataSort = {true} >UniversityArea</TableHeaderColumn>
            <TableHeaderColumn dataField='Owner' filter={ { type: 'TextFilter', delay: 1000 } } tdStyle={ { whiteSpace: 'normal' } }>Owner</TableHeaderColumn>
            <TableHeaderColumn dataField='AuditArea' tdStyle={ { whiteSpace: 'normal' } }>AuditArea</TableHeaderColumn>
            <TableHeaderColumn dataField='Description' tdStyle={ { whiteSpace: 'normal' } } searchable={ false }>Description</TableHeaderColumn>
            <TableHeaderColumn dataField="button" dataFormat={this.cellButton.bind(this)}>Buttons</TableHeaderColumn>
            </BootstrapTable>
            
            </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
      universities: state.universities
    }
  }

export default connect(mapStateToProps)(UniversityList)  