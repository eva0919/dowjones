import types from '../constants/ActionTypes'
import WebAPIUtils from '../utils/WebAPIUtils'


export function getTotalStockName(params){
  console.log( "getTotalStockName" );
  return {
    types: [ types.GET_STOCK_NAME_LIST_REQUEST, types.GET_STOCK_NAME_LIST_SUCCESS, types.GET_STOCK_NAME_LIST_ERROR ],
		promise: WebAPIUtils.getStockNameList(),
  }
}

export function getStockByName(params) {
  console.log( "getStockByName" );
	return {
		types: [ types.GET_STOCK_DATA_REQUEST, types.GET_STOCK_DATA_SUCCESS, types.GET_STOCK_DATA_ERROR ],
		promise: WebAPIUtils.getStockByName(params),
	};
}
