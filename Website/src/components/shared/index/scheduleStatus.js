import React, {Component} from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import * as actions from 'actions';


class ScheduleStatus extends React.Component{



    constructor() {
        super()
    }
    
    componentWillMount() {
        const status = "scheduled";
        this.props.dispatch(actions.fetchAuditScheduledStatus(status))
      }
    
    render() {
      
        return (
            <div>
      
            <div class="card">
            <div class="card-body">
            <h2 class="card-header">Scheduled Audits</h2>
            <BootstrapTable data={this.props.auditScheduledStatus.data} striped={true} hover={true} pagination={false} search={ true } multiColumnSearch={ true } exportCSV={false}>
            <TableHeaderColumn isKey dataField='_id' hidden={true}>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='NextAuditDate'>Next Date</TableHeaderColumn>
            <TableHeaderColumn dataField='RiskFactor' dataSort = {true}>Risk Factor</TableHeaderColumn>
            <TableHeaderColumn dataField='RiskLevel'>Risk Level</TableHeaderColumn>
            <TableHeaderColumn dataField='DaysRequired'>Days</TableHeaderColumn>
            <TableHeaderColumn dataField='ElapsedMonths'>Months</TableHeaderColumn>
            <TableHeaderColumn dataField='createdAt' tdStyle={ { whiteSpace: 'normal' } } >Creation Date</TableHeaderColumn>
            <TableHeaderColumn dataField='AuditArea' tdStyle={ { whiteSpace: 'normal' } } >AuditArea</TableHeaderColumn>
            </BootstrapTable>
           
            </div>
             </div>
             </div>
            
              
             
        )
    
        }
    }
    
    
    function mapStateToProps(state) {
        return {
            auditScheduledStatus: state.auditScheduleStatus
        }
      }
    

export default connect(mapStateToProps)(ScheduleStatus)  