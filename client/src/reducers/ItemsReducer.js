let ItemsReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_ITEMS":
			return action.payload;
			break;
		case "ADD_FAV":
			return [
				...state.map((item) => {
					if (item._id == action.payload.id) item.favedByUser = true;
					return item;
				}),
			];
			break;
		case "REMOVE_FAV":
			return [
				...state.map((item) => {
					if (item._id == action.payload.id) item.favedByUser = false;
					return item;
				}),
			];
			break;
		case "DELETE_ITEM":	
			return [...state.filter(item=>item._id != action.payload.id)]
			break
		default:
			return state;
			break;
	}
};

export default ItemsReducer;
