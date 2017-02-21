import {List, ProductRecord, convertToRecordMap } from '../constants/Types';
import axios from 'axios';
// WebAPIUitl is responsible to interacting with remote REST APIs
export default {
    getStockByName: function(params){
        let stockName = params.stockName || "AAPL";
        return axios.get('http://localhost:3000/api/stocks/'+stockName)
        .then( res => res.data )
        .catch(function (error) {
          console.log(error);
        });
    },
    getStockNameList: function(){
        return axios.get('http://localhost:3000/api/stocks')
        .then( res => res.data )
        .catch(function (error) {
          console.log(error);
        });
    }
};
