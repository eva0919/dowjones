import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import * as StockActions from '../../actions/StockActions';
import { fetchNeeds } from '../../utils/fetchComponentData';
import PlottableChart from '../PlottableChart';
import ToggleGroup from '../ToggleGroup';
import MenuGroup from '../MenuGroup';
import Paper from 'material-ui/Paper';
// import Plottable from 'plottable'

const defaultProps = {
  stockName: 'AAPL',
  colors: [
    "#2894FF",
    "#34b24c",
    "#ffa500",
    "#551a8b",
  ],
};

class DowJonesContainer extends Component {
  static needs = [
    StockActions.getTotalStockName,
    StockActions.getStockByName
	];
	constructor(props) {
		super(props);
    this.actions = bindActionCreators(StockActions, props.dispatch);
    this.state = {
      stock: this.props.stockName,
      toggleOption:{
        High: true,
        Low: false,
        Open: false,
        Close: false,
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleHandleGroup = [
      this.handleToggleHigh.bind(this),
      this.handleToggleLow.bind(this),
      this.handleToggleOpen.bind(this),
      this.handleToggleClose.bind(this),
    ]
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
  }
  handleToggleHigh = (event, isInputChecked) => {
    this.setState({toggleOption:{
      ...this.state.toggleOption,
      High: isInputChecked,

    }});
  }
  handleToggleLow = (event, isInputChecked) => {
    this.setState({toggleOption:{
      ...this.state.toggleOption,
      Low: isInputChecked,

    }});
  }
  handleToggleOpen = (event, isInputChecked) => {
    this.setState({toggleOption:{
      ...this.state.toggleOption,
      Open: isInputChecked,

    }});
  }
  handleToggleClose = (event, isInputChecked) => {
    this.setState({toggleOption:{
      ...this.state.toggleOption,
      Close: isInputChecked,

    }});
  }
	render() {
    const {
      stockState
    } = this.props;
    const styles = {
      root:{
        margin:"10px"
      }

    }
    console.log( this );
		return (<Paper style={styles.root}zDepth={1} rounded={false} >
              <MenuGroup value={this.state.stock} handleChange={this.handleChange} groupList={stockState.stocksNameList}/>
              <ToggleGroup handleGroup={this.toggleHandleGroup} toggleOption={this.state.toggleOption}/>
              <PlottableChart dataSet={stockState.stocksByName} filterOption={this.state.toggleOption} colors={this.props.colors}/>
            </Paper>

  )
	}
}

DowJonesContainer.defaultProps = defaultProps;

export default connect( (state, ownProps) => ({ stockState: state.stockState }) )(DowJonesContainer);
