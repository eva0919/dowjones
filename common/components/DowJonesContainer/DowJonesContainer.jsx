import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import * as StockActions from '../../actions/StockActions';
import { fetchNeeds } from '../../utils/fetchComponentData';
import PlottableChart from '../PlottableChart';
import ToggleGroup from '../ToggleGroup';
import MenuGroup from '../MenuGroup';
import RaisedButton from 'material-ui/RaisedButton';

import Toggle from 'material-ui/Toggle';
// import Plottable from 'plottable'

const defaultProps = {
  stockName: 'AAPL',
};

class DowJonesContainer extends Component {
  static needs = [
    StockActions.getTotalStockName,
    StockActions.getStockByName
	];
	constructor(props) {
		super(props);
    this.actions = bindActionCreators(StockActions, props.dispatch);
    this.state = {stock: this.props.stockName, toggleHigh:false, };
    this.handleChange = this.handleChange.bind(this);
	}
  componentDidMount() {
        if( !this.props.stockState ){
    			fetchNeeds( DowJonesContainer.needs, this.props )
    			return <div>Loading...</div>
    		}
	}
  handleChange = (event, index, stock) => {
    console.log( stock );
    this.setState({stock}, ()=>{
      this.actions.getStockByName({stockName:this.state.stock});
    })
  };

	render() {
    const {
      stockState
    } = this.props;
    const styles = {
      toggle:{
        display:"inline-block",
        width:"100px"
      }

    }
    console.log( this );
		return (<div>
              <MenuGroup value={this.state.stock} handleChange={this.handleChange} groupList={stockState.stocksNameList}/>
              <br />
              <ToggleGroup />
              <PlottableChart dataSet={stockState.stocksByName}/>
            </div>

  )
	}
}

DowJonesContainer.defaultProps = defaultProps;

export default connect( (state, ownProps) => ({ stockState: state.stockState }) )(DowJonesContainer);
