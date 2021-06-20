import ItemsReducer from './ItemsReducer'
import UserReducer from './UserReducer'
import FavItemsReducer from './FavItemsReducer'
import {combineReducers} from 'redux'

export default combineReducers({
	items:ItemsReducer,
	favItems:FavItemsReducer,
	user:UserReducer
})
