import React from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import * as actions from 'actions';


class Index extends React.Component {

    constructor() {
        super()
        this.options = {
            defaultSortName: '_id',  // default sort column name
            defaultSortOrder: 'desc'  // default sort order
          };
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
            <BootstrapTable data={this.props.auditPlannedStatus.data} striped={true} hover={true} pagination={false} search={ true } multiColumnSearch={ true } exportCSV={false} options={this.options}>
            <TableHeaderColumn isKey dataField='_id' dataSort hidden={true}>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='NextAuditDate'>Next Date</TableHeaderColumn>
            <TableHeaderColumn dataField='RiskFactor' dataSort = {true}>Risk Factor</TableHeaderColumn>
            <TableHeaderColumn dataField='RiskLevel'>Risk Level</TableHeaderColumn>
            <TableHeaderColumn dataField='DaysRequired'>Days</TableHeaderColumn>
            <TableHeaderColumn dataField='ElapsedMonths'>Months</TableHeaderColumn>
            <TableHeaderColumn dataField='createdAt' tdStyle={ { whiteSpace: 'normal' } }>Creation Date</TableHeaderColumn>
            <TableHeaderColumn dataField='AuditArea' tdStyle={ { whiteSpace: 'normal' } }>AuditArea</TableHeaderColumn>
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