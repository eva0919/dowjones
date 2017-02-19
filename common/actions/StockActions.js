import types from '../constants/ActionTypes'
import WebAPIUtils from '../utils/WebAPIUtils'


export function getStockByName(params) {
  console.log( "getStockByName" );
	return {
		types: [ types.GET_STOCK_DATA_REQUEST, types.GET_STOCK_DATA_SUCCESS, types.GET_STOCK_DATA_ERROR ],
		promise: WebAPIUtils.getStockByName(params),
	};
}
