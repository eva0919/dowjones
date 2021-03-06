import fs from 'fs';
import express from 'express';
import path from 'path';

import React from 'react'
import { renderToString } from 'react-dom/server'
import bodyParser from 'body-parser';
import mysql from 'mysql';
import { Router, RouterContext, match } from 'react-router';
import routes from '../common/routes/routing';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import promiseMiddleware from '../common/middlewares/PromiseMiddleware';
import combinedReducers from '../common/reducers';

import fetchComponentData from '../common/utils/fetchComponentData';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';

const finalCreateStore = applyMiddleware(promiseMiddleware)( createStore );

// console.log( 'env: ', process.env.NODE_ENV )
let pool = mysql.createPool({
    host        : '127.0.0.1',
    user        : 'root',
    password    : 'test',
    database    : 'stocks',
});

const app = express();
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, '../client/assets')))

// initialize webpack HMR
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get('/api/stocks/:name', function(req, res) {
  console.log( req.params );
	let query = "SELECT * FROM dowjones WHERE Name='"+req.params.name+"' ORDER BY Date";
  // console.log( query );
  pool.query( query, function (error, results, fields) {
       res.status(200).send( JSON.stringify(results) );
  });
	// res.status(200).send("API Hello");
});
app.get('/api/stocks', function(req, res) {
	let query = "SELECT name FROM dowjones GROUP BY name";
  // console.log( query );
  pool.query( query, function (error, results, fields) {
       res.status(200).send( JSON.stringify(results) );
  });
	// res.status(200).send("API Hello");
});

// server rendering
app.use( ( req, res, next ) => {

	const store = finalCreateStore(combinedReducers);
	const muiTheme = getMuiTheme({
	  palette: {
	    primary1Color: green500,
	    primary2Color: green700,
	    primary3Color: green100,
	  },
	}, {
	  avatar: {
	    borderColor: null,
	  },
	  userAgent: req.headers['user-agent'],
	});
	// react-router
	match( {routes, location: req.url}, ( error, redirectLocation, renderProps ) => {

		if ( error )
			return res.status(500).send( error.message );

		if ( redirectLocation )
			return res.redirect( 302, redirectLocation.pathname + redirectLocation.search );

		if ( renderProps == null ) {
			// return next('err msg: route not found'); // yield control to next middleware to handle the request
			return res.status(404).send( 'Not found' );
		}

		// console.log( '\nserver > renderProps: \n', require('util').inspect( renderProps, false, 1, true) )
		// console.log( '\nserver > renderProps: \n', require('util').inspect( renderProps.components, false, 3, true) )

		// this is where universal rendering happens,
		// fetchComponentData() will trigger actions listed in static "needs" props in each container component
		// and wait for all of them to complete before continuing rendering the page,
		// hence ensuring all data needed was fetched before proceeding
		//
		// renderProps: contains all necessary data, e.g: routes, router, history, components...
		fetchComponentData( store.dispatch, renderProps.components, renderProps.params)

		.then( () => {

			const initView = renderToString((
				<MuiThemeProvider muiTheme={muiTheme}>
					<Provider store={store}>
					  <RouterContext {...renderProps} />
					</Provider>
				</MuiThemeProvider>
			))

			// console.log('\ninitView:\n', initView);

			let state = JSON.stringify( store.getState() );
			// console.log( '\nstate: ', state )

			let page = renderFullPage( initView, state )
			// console.log( '\npage:\n', page );

			return page;

		})

		.then( page => res.status(200).send(page) )

		.catch( err => res.end(err.message) );
	})
})


function renderFullPage(html, initialState) {
  return `
	<!doctype html>
	<html lang="utf-8">
	  <head>
		<title>Universal Redux Example</title>
		<link rel="shortcut icon" type="image/png" href="assets/images/react.png">
		<link rel="stylesheet" href="/assets/css/uikit.almost-flat.min.css">
		<link rel="stylesheet" href="/assets/css/plottable.css">
	  </head>
	  <body>
	  <div class="container">${html}</div>
		<script>window.$REDUX_STATE = ${initialState}</script>
		<script src="/static/bundle.js"></script>
	  </body>
	</html>
	`
}

// example of handling 404 pages
app.get('*', function(req, res) {
	res.status(404).send('Server.js > 404 - Page Not Found');
})

// global error catcher, need four arguments
app.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
  console.log( 'uncaughtException: ', evt );
})

app.listen(3000, function(){
	console.log('Listening on port 3000');
});
