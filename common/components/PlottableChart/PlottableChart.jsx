import React, { Component, PropTypes } from 'react';

import {PlottableChartUtility} from '../../utils/PlottableUtility'

// import Plottable from 'plottable'


class PlottableChart extends Component {
	constructor(props) {
		super(props);
    if( typeof window !== 'undefined' ){
      this.Plottable = require('plottable');
    }
	}
  componentDidMount() {
    if( typeof window !== 'undefined' ){
      console.log("did Mount");
      PlottableChartUtility(this.Plottable, this.refs.svgDiv, this.props.dataSet, {});
    }
  }
  componentDidUpdate(prevProps, prevState){
    if( typeof window !== 'undefined' ){
      console.log( "componentDidUpdate" );
      PlottableChartUtility(this.Plottable, this.refs.svgDiv, this.props.dataSet, {});
    }
  }
	render() {
    console.log( this.props.dataSet );
		return (
      <div ref="svgDiv" ><svg style={{height:"300px"}}/></div>
    );
	}
}

export default PlottableChart;
