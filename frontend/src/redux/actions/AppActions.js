export const SET_USERS_DATA = "SET_USERS_DATA";

export function setUsers(users) {
    return dispatch => {
        dispatch({
            type: SET_USERS_DATA,
            data: users
        });
    };
}
