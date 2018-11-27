import React, {Component} from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import * as actions from 'actions';


class Index extends React.Component {

    constructor() {
        super()
    }
    componentWillMount() {
        const status = "planned";
        this.props.dispatch(actions.fetchAuditPlannedStatus(status))
      }
    
    render() {
       // const {isDeleted } = this.state;
        return (
            <div>
            <div class="row">
            
            <div className="col-md-6">
            <div class="card">
            <div class="card-body">
            <h2 class="card-header">Top 10 List of University Data</h2>
            <BootstrapTable data={this.props.auditPlannedStatus.data} striped={true} hover={true} pagination={true} search={ true } multiColumnSearch={ true } exportCSV={false}>
            <TableHeaderColumn isKey dataField='_id' hidden={true}>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='NextAuditDate'>Next Date</TableHeaderColumn>
            <TableHeaderColumn dataField='RiskFactor' dataSort = {true}>Risk Factor</TableHeaderColumn>
            <TableHeaderColumn dataField='RiskLevel'>Risk Level</TableHeaderColumn>
            <TableHeaderColumn dataField='DaysRequired'>Days</TableHeaderColumn>
            <TableHeaderColumn dataField='ElapsedMonths'>Months</TableHeaderColumn>
            <TableHeaderColumn dataField='createdAt'>Creation Date</TableHeaderColumn>
            <TableHeaderColumn dataField='universitydata.AuditArea'>AuditArea</TableHeaderColumn>
            </BootstrapTable>
           
            </div>
             </div>
             </div>
              </div>
              </div>
              
             
        )
    }

}

function mapStateToProps(state) {
    return {
        auditPlannedStatus: state.auditPlanStatus
    }
  }

export default connect(mapStateToProps)(Index)