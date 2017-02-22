import {List, ProductRecord, convertToRecordMap } from '../constants/Types';
import axios from 'axios';
// WebAPIUitl is responsible to interacting with remote REST APIs
const apiUrl = "http://localhost:3000"
export default {
    getStockByName: function(params){
        let stockName = params.stockName || "AAPL";
        return axios.get( apiUrl+'/api/stocks/'+stockName)
        .then( res => res.data )
        .catch(function (error) {
          console.log(error);
        });
    },
    getStockNameList: function(){
        return axios.get(apiUrl+'/api/stocks')
        .then( res => res.data )
        .catch(function (error) {
          console.log(error);
        });
    }
};
