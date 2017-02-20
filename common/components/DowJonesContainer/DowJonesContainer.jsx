import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StockActions from '../../actions/StockActions';
import { fetchNeeds } from '../../utils/fetchComponentData';

// import Plottable from 'plottable'

const defaultProps = {
  stockName: 'AAPL',
};

class DowJonesContainer extends Component {
  static needs = [
    StockActions.getStockByName
	];
	constructor(props) {
		super(props);
    this.actions = bindActionCreators(StockActions, props.dispatch);
    if( typeof window !== 'undefined' ){
      this.Plottable = require('plottable');
    }
    this.state = {
      el: null,
    }
	}
  componentDidMount() {
    if( typeof window !== 'undefined' ){
      console.log("did Mount");
      const Plottable = this.Plottable;
      // console.log( this );
      // let el = this.getDOMNode();
      var xScale = new Plottable.Scales.Linear();
      var yScale = new Plottable.Scales.Linear();

      var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
      var yAxis = new Plottable.Axes.Numeric(yScale, "left");

      var plot = new Plottable.Plots.Line();
      plot.x(function(d) { return d.x; }, xScale);
      plot.y(function(d) { return d.y; }, yScale);

      var data = [
        { "x": 0, "y": 1 },
        { "x": 1, "y": 2 },
        { "x": 2, "y": 4 },
        { "x": 3, "y": 8 }
      ];

      var dataset = new Plottable.Dataset(data);
      plot.addDataset(dataset);

      var chart = new Plottable.Components.Table([
        [yAxis, plot],
        [null, xAxis]
      ]);
      console.log( chart );
      // let el = document.createElement("svg");
      // let el = React.createElement('tagName');
      // chart.renderTo(el);
      // this.setState({el:el});
      chart.renderTo("svg#tutorial-result");
    }
    if( !this.props.stockState ){
  			fetchNeeds( DowJonesContainer.needs, this.props )
  			return <div>Loading...</div>
  	}
  }
	render() {
    console.log( this.props );
    // if( this.state.el ){
    //   console.log( typeof this.state.el );
    //   console.log( this.state.el );
      // return ( <svg className="plottable" width="100%" height="100%" style={{overflow: 'visible'}}><rect className="safari-event-backing" x={0} y={0} width="100%" height="100%" style={{opacity: 0}} /><g className="component table" transform="translate(0,0)"><g className="background-container"><rect className="background-fill" width={0} height={0} /></g><g className="content"><g className="component axis y-axis" transform="translate(0,0)"><g className="background-container"><rect className="background-fill" width={0} height={0} /></g><g className="content"><g className="tick-mark-container"><line className="tick-mark end-tick-mark" x1={0} y1={0} x2={-5} y2={0} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={-5} y2={0} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={-5} y2={0} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={-5} y2={0} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={-5} y2={0} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={-5} y2={0} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={-5} y2={0} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={-5} y2={0} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={-5} y2={0} style={{visibility: 'inherit'}} /><line className="tick-mark end-tick-mark" x1={0} y1={0} x2={-5} y2={0} style={{visibility: 'inherit'}} /></g><g className="tick-label-container" transform="translate(-15, 0)"><text className="tick-label" x={0} y={0} dx="0em" dy="0.3em" style={{textAnchor: 'end', visibility: 'inherit'}}>0</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.3em" style={{textAnchor: 'end', visibility: 'inherit'}}>1</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.3em" style={{textAnchor: 'end', visibility: 'inherit'}}>2</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.3em" style={{textAnchor: 'end', visibility: 'inherit'}}>3</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.3em" style={{textAnchor: 'end', visibility: 'inherit'}}>4</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.3em" style={{textAnchor: 'end', visibility: 'inherit'}}>5</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.3em" style={{textAnchor: 'end', visibility: 'inherit'}}>6</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.3em" style={{textAnchor: 'end', visibility: 'inherit'}}>7</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.3em" style={{textAnchor: 'end', visibility: 'inherit'}}>8</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.3em" style={{textAnchor: 'end', visibility: 'inherit'}}>9</text></g><line className="baseline" x1={0} y1={0} x2={0} y2={0} /><g className="annotation-container"><g className="annotation-line-container" /><g className="annotation-circle-container" /><g className="annotation-rect-container" /><g className="annotation-label-container" /></g></g><g className="foreground-container" /><g className="box-container"><rect className="bounding-box" width={0} height={0} /></g></g><g className="component plot xy-plot line-plot" clipPath="url(&quot;http://localhost:3000/#plottableClipPath1&quot;)" transform="translate(0,0)"><g className="background-container"><rect className="background-fill" width={0} height={0} /></g><g className="content"><g className="render-area"><g><path className="line" strokeWidth="2px" d="M0,0L0,0L0,0L0,0" style={{fill: 'none'}} /></g></g></g><g className="foreground-container" /><g className="box-container"><clippath id="plottableClipPath1"><rect className="clip-rect" width={0} height={0} /></clippath><rect className="bounding-box" width={0} height={0} /></g></g><g className="component axis x-axis" transform="translate(0,0)"><g className="background-container"><rect className="background-fill" width={0} height={0} /></g><g className="content"><g className="tick-mark-container"><line className="tick-mark end-tick-mark" x1={0} y1={0} x2={0} y2={5} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={0} y2={5} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={0} y2={5} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={0} y2={5} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={0} y2={5} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={0} y2={5} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={0} y2={5} style={{visibility: 'inherit'}} /><line className="tick-mark" x1={0} y1={0} x2={0} y2={5} style={{visibility: 'inherit'}} /><line className="tick-mark end-tick-mark" x1={0} y1={0} x2={0} y2={5} style={{visibility: 'inherit'}} /></g><g className="tick-label-container" transform="translate(0, 15)"><text className="tick-label" x={0} y={0} dx="0em" dy="0.95em" style={{textAnchor: 'middle', visibility: 'inherit'}}>-0.5</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.95em" style={{textAnchor: 'middle', visibility: 'inherit'}}>0</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.95em" style={{textAnchor: 'middle', visibility: 'inherit'}}>0.5</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.95em" style={{textAnchor: 'middle', visibility: 'inherit'}}>1</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.95em" style={{textAnchor: 'middle', visibility: 'inherit'}}>1.5</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.95em" style={{textAnchor: 'middle', visibility: 'inherit'}}>2</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.95em" style={{textAnchor: 'middle', visibility: 'inherit'}}>2.5</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.95em" style={{textAnchor: 'middle', visibility: 'inherit'}}>3</text><text className="tick-label" x={0} y={0} dx="0em" dy="0.95em" style={{textAnchor: 'middle', visibility: 'inherit'}}>3.5</text></g><line className="baseline" x1={0} y1={0} x2={0} y2={0} /><g className="annotation-container"><g className="annotation-line-container" /><g className="annotation-circle-container" /><g className="annotation-rect-container" /><g className="annotation-label-container" /></g></g><g className="foreground-container" /><g className="box-container"><rect className="bounding-box" width={0} height={0} /></g></g></g><g className="foreground-container" /><g className="box-container"><rect className="bounding-box" width={0} height={0} /></g></g></svg>);
    // }
		return <div>DowJones</div>;
	}
}

DowJonesContainer.defaultProps = defaultProps;

export default connect( (state, ownProps) => ({ stockState: state.stockState }) )(DowJonesContainer);
