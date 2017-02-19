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
	}
  componentDidMount() {
    if( !this.props.userProfileState ){
  			fetchNeeds( DowJonesContainer.needs, this.props )
  			return <div>Loading...</div>
  	}
    this.Plottable = require( 'plottable' );
  }
	render() {
    console.log( this.props );
    if( this.Plottable ){
      var xScale = new this.Plottable.Scales.Time();
    }
		return <div>DowJones</div>;
	}
}

DowJonesContainer.defaultProps = defaultProps;
export default connect( (state, ownProps) => ({ stockState: state.stockState }) )(DowJonesContainer);
