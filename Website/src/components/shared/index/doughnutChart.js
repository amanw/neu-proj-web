import React from "react";
import ReactSvgPieChart from "react-svg-piechart";
import * as actions from "actions";
 
const data = [
  {title: "Planned Audits", value: 100, color: "#22594e",label:"test"},
  {title: "Scheduled Audits", value: 60, color: "#2f7d6d"},
  {title: "Closed Audits", value: 30, color: "#3da18d"},
]
 

class DoughnutChart extends React.Component {
    constructor(){
        super()

        this.state = {
            userRentals: []
          }
    }

    componentWillMount() {
     var query = "planned";
    }

    

    render() {

        return(
            <ReactSvgPieChart
    data={data}
    // If you need expand on hover (or touch) effect
    expandOnHover
    // If you need custom behavior when sector is hovered (or touched)
    onSectorHover={(d, i, e) => {
      if (d) {
        console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
      } else {
        console.log("Mouse leave - Index:", i, "Event:", e)
      }
    }
}
  />

        )
    }
}

export default DoughnutChart;