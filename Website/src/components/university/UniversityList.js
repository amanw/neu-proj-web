import React, {Component} from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import * as actions from 'actions';
class UniversityList extends React.Component {

    constructor() {
        super()
        this.routeChange = this.routeChange.bind(this);

       
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
    

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button 
                type="button"
                className="btn btn-info react-bs-table-add-btn addbutton" 
                onClick={() => 
                this.handleInitialize(row)}
            >
            <span><i className="fa glyphicon glyphicon-pencil fa-pencil"></i> Edit</span>
            </button>
        )
        }


    render() {
        
        return (
            <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-university"/><span> University Data </span></li>
            </ol>
            </nav>
            <div className="col-md-12">
            <button type="button" className="btn btn-info react-bs-table-add-btn addbutton" onClick = {this.routeChange}><span><i className="fa glyphicon glyphicon-plus fa-plus"></i> New</span></button>
            
            <BootstrapTable data={this.props.universities.data} striped={true} hover={true} pagination={true} search={ true } multiColumnSearch={ true } exportCSV={true}>
            <TableHeaderColumn isKey dataField='_id' hidden={true}>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='University'>University</TableHeaderColumn>
            <TableHeaderColumn dataField='UniversityArea' dataSort = {true}>UniversityArea</TableHeaderColumn>
            <TableHeaderColumn dataField='Owner'>Owner</TableHeaderColumn>
            <TableHeaderColumn dataField='AuditArea'>AuditArea</TableHeaderColumn>
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