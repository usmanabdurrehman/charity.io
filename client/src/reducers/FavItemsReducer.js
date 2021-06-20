let FavItemsReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_FAV_ITEMS":
			return action.payload;
			break;
		case "REMOVE_FROM_FAV_ITEM":	
			return [...state.filter(item=>item._id != action.payload.id)]
			break
		default:
			return state;
			break;
	}
};

export default FavItemsReducer;
