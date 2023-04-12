const initState = {};

const reducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOAD_USER_DATA':
            return {
                ...action.payload
            }
        case 'CLEAR_USER_DATA':
            return initState;
        default:
            return state;
    }
}

export default reducer;
