import Immutable from 'immutable';
import {StockState, convertToRecordMap } from '../constants/Types';
import createReducer from '../utils/createReducer';
import types from '../constants/ActionTypes';

function GET_STOCK_NAME_LIST_SUCCESS(state, action){
  // console.log( action );
  console.log( "GET_STOCK_NAME_LIST_SUCCESS" );
  state = state.update('stocksNameList', list => {
		// return action.result.map( data =>{
		// 	return (new dynamicRecordBySchema( data ) )
		// })
    return action.result;
	});
	return state;
}

function GET_STOCK_DATA_SUCCESS(state, action){
  // console.log( action );
  console.log( "GET_STOCK_DATA_SUCCESS" );
  state = state.update('stocksByName', list => {
		// return action.result.map( data =>{
		// 	return (new dynamicRecordBySchema( data ) )
		// })
    return action.result;
	});
	return state;
}

const handlers =
{
  [types.GET_STOCK_DATA_SUCCESS]:GET_STOCK_DATA_SUCCESS,
  [types.GET_STOCK_NAME_LIST_SUCCESS]: GET_STOCK_NAME_LIST_SUCCESS,
}

export default createReducer( new StockState(), handlers );
