import React, {Component} from 'react';
import PlannedStatus from '../shared/index/plannedStatus';
import ScheduleStatus from '../shared/index/scheduleStatus';
import DonutChart from 'react-donut-chart';
import * as actions from 'actions';
import { connect } from 'react-redux';

class Index extends React.Component {

    constructor() {
        super()
    }

    componentWillMount(){
        this.props.dispatch(actions.fetchGraph());
        console.log(this.props);
    }
    
    render() {
       // const {isDeleted } = this.state;
        return (
            <div>
                <div class="row align-item-start">
                    <div className="col-md-6">
                        <PlannedStatus />
                        <ScheduleStatus />
                    </div>
                
                <div className="col-md-3">
                <h1 className="header">Audit Status Display</h1>
                
                    <DonutChart 
                    data={this.props.graphdata.data}/>
                </div>
                </div>
                </div>
        )
    }

}

function mapStateToProps(state) {
    return {
      graphdata: state.auditGraphData
    }
  }

export default connect(mapStateToProps)(Index) 
