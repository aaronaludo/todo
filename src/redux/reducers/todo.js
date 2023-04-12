const initState = [];

const reducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [
                ...action.payload
            ]
        case 'CLEAR_TODO':
            return initState;
        default:
            return state;
    }
}

export default reducer;
