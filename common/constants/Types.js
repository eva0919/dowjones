
import Immutable from 'immutable';

// define ProductState shape inside redux state
export const SystemState = Immutable.Record({
		modalOpen: false
})

export const StockState = Immutable.Record({
		stocksByName: Immutable.List()
})

export const StockDailyData = Immutable.Record({
	id: null,
	date: "",
	open: 0,
	close: 0,
	high: 0,
	low: 0,
})

export function convertToRecordMap( arr, Def ){
	return arr.reduce( (acc, item) => acc.set( item.id, new Def(item) ), Immutable.Map() );
}

export function convertMapToImmutable( map, Def ){
	return Object.keys(map)
				 .reduce( (acc, key) => {
				 	let item = map[key];
				 	return acc.set( item.id, new Def(item) );
				 }, Immutable.Map() );
}
