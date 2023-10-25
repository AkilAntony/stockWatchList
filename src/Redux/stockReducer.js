
const initialState = {
    items:[]
}

const stcokReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TO-CART':
            console.log({ ...state,
                items: [...state.items, action.payload]})
            return{
                ...state,
                items: [...state.items, action.payload]
            };
        case 'REMOVE_FROM-CART':
            return{
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            };
        default:
            return state;
    }
}

export default stcokReducer;