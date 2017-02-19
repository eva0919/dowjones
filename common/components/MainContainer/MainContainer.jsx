import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StockActions from '../../actions/StockActions';
import { fetchNeeds } from '../../utils/fetchComponentData';
import DevTools from '../DevTools';
class MainContainer extends Component {

	constructor(props, context) {
		super(props, context);
		this.actions = bindActionCreators(StockActions, props.dispatch);
	}

	componentDidMount() {
	}

	render() {
    let tool = ( 'undefined' !== typeof window && true == window.$REDUX_DEVTOOL ) ? <DevTools /> : null;
	  return (
		    <div>
          {this.props.main}
        </div>
	  );
	}

};

// 使用 connect 精準獲取這個 view 需要的資料源，如此可減少日後不必要的 redraw
export default connect( (state, ownProps) => ({ systemState: state.SystemState }) )(MainContainer);
