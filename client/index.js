import React, { Component } from 'react';
import { render } from 'react-dom';
import Immutable from 'immutable';
import { Router, Route, RouterContext, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../common/utils/configureStore';
import { SystemState, StockState } from '../common/constants/Types';
import routes from '../common/routes/routing';
import injectTapEventPlugin from 'react-tap-event-plugin';
if( typeof window !== 'undefined' ){
	injectTapEventPlugin();
}
let state = null;
if ( window.$REDUX_STATE ) {

	// 解開 server 預先傳來的資料包，稍後會放入 store 成為 initState
	state = window.$REDUX_STATE;
	// console.log(state);
	// begin marshalling data into Immutable types
	// state.products = new ProductState( {
	// 	$fetched: document.location.pathname == '/',
	// 	productsById: convertMapToImmutable( state.products.productsById, ProductRecord ),
	// 	total: state.products.total,
	// } );
	//
	// state.carts = new CartState( {
	// 	cartsById: Immutable.List.of( ...state.carts.cartsById ),
	// } );

	state.stockState = new StockState({
			stocksByName:  state.stockState.stocksByName || []
	})
	state.systemState = new SystemState({
			SystemState:  false
	})

	// console.log( 'server-rendering state restored: ', state );
}

const store = configureStore( state )

// 注意 <Provider> 是 react-redux 提供的元件，不屬於 react-router
render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,
	document.querySelector( '.container' )
);
