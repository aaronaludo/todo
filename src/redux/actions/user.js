export const loadUserData = payload => {
    return {
        type: 'LOAD_USER_DATA',
        payload: payload
    }
}

export const logoutUser = () => {
    return {
        type: 'CLEAR_USER_DATA'
    }
}
