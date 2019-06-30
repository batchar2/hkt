import React from 'react';

import './style.css';
//import 'react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries,
  HorizontalBarSeriesCanvas
} from 'react-vis';


export default class Vis extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          useCanvas: true
      };
  }
  render() {
      const {useCanvas} = this.state;
      const BarSeries = useCanvas ? HorizontalBarSeriesCanvas : HorizontalBarSeries;
      const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
      let visdata = [];
      let maxX = 10;
      if (this.props.visdata) {
          visdata = this.props.visdata;

          for (var i in visdata) {
              let num = parseInt(visdata[i].x, 10);
              if (num > maxX) maxX = num; 
          }
      }
      console.log('[vis] data', visdata);
      // xDomain={[0, 1]} tickValues={[0, 20, 60, 80, 100]}
      //{[{y: 2, x: 12}, {y: 4, x: 2}, {y: 5, x: 11}]}
      return (
          <div>
                <XYPlot width={600} height={800} stackBy="x" xDomain={[0, maxX+2]}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Люди"/>
                    <YAxis tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ,18, 19, 20, 21, 22, 23]} title="Часы"/>
                    <BarSeries data={visdata} />
                </XYPlot>
          </div>
        );
  }
}
