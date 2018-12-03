import React from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import * as actions from 'actions';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class IssueList extends React.Component {

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

    // statusFormatter(cell) {
    //     debugger;
    //     if(cell === "scheduled"){
    //         return `<p style ='color:orange'>${cell}</p>`
    //     }
    //     else if(cell === "ongoing"){
    //         return `<p style ='color:green'>${cell}</p>`
    //     }
    //     else if(cell === "closed"){
    //         return `<p style ='color:red'>${cell}</p>`
    //     }
    //     else{
    //         return `<p style ='color:black'>${cell}</p>`
    //     }

    // }
    // Lifecycle 
    componentWillMount() {
        this.props.dispatch(actions.fetchIssues());
      }
    
    componentDidMount() {
        this.props.dispatch(actions.fetchIssues());
      }
    
    
    handleInitialize(row){
        let path = `/issues/edit/${row._id}`;
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
                this.props.dispatch(actions.issueDelete(row._id))
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

      auditorsFormatter(cell){
          debugger;
          var newStr = "";
          if(cell !== undefined){
           newStr = cell.split(',')
          }
          return newStr[1] ;
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
                <li className="breadcrumb-item active" aria-current="page"><i className="fa fa-list"/><span> Issue List </span></li>
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
            <BootstrapTable data={this.props.issues.data} striped={true} hover={true} pagination={true} search={ true } multiColumnSearch={ true } exportCSV={true} options={this.options}>
            <TableHeaderColumn isKey dataField='_id' dataSort hidden={true} >ID</TableHeaderColumn>
            <TableHeaderColumn  dataField='test' dataSort hidden={false} dataFormat={this.indexN} >ID</TableHeaderColumn>
            <TableHeaderColumn dataField='Name' tdStyle={ { whiteSpace: 'normal' } }>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='Description' tdStyle={ { whiteSpace: 'normal' }}>Description</TableHeaderColumn>
            <TableHeaderColumn dataField='Owner' tdStyle={ { whiteSpace: 'normal' } }>Owner</TableHeaderColumn>
            <TableHeaderColumn dataField='RiskLevel'>Risk Level</TableHeaderColumn>
            <TableHeaderColumn dataField='ManagementResponse' thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } }>Management Response</TableHeaderColumn>
            <TableHeaderColumn dataField='CompletionDate' thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } }>Completion Date</TableHeaderColumn>
            <TableHeaderColumn dataField='AssignedTo' dataFormat={this.auditorsFormatter} tdStyle={ { whiteSpace: 'normal' }}>AssignedTo</TableHeaderColumn>
            <TableHeaderColumn dataField='IssueManager'thStyle={ { whiteSpace: 'normal' } } dataFormat={this.auditorsFormatter} tdStyle={ { whiteSpace: 'nowrap' }}>Issue Manager</TableHeaderColumn>
            <TableHeaderColumn dataField='RevisedCompletionDate' thStyle={ { whiteSpace: 'normal' } }>Revised Completion Date</TableHeaderColumn>
            <TableHeaderColumn dataField='FollowUpTesting' thStyle={ { whiteSpace: 'normal' } }>FollowUp Testing</TableHeaderColumn>
            <TableHeaderColumn dataField='ImplementationDate' thStyle={ { whiteSpace: 'normal' } }>Implementation Date</TableHeaderColumn>
            <TableHeaderColumn dataField='ClosedDate' tdStyle={ { whiteSpace: 'normal' } }>Closed Date</TableHeaderColumn>
            <TableHeaderColumn dataField="button" dataFormat={this.cellButton.bind(this)}>Buttons</TableHeaderColumn>
            </BootstrapTable>

            </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
      issues: state.issueList
    }
  }

export default connect(mapStateToProps)(IssueList)  