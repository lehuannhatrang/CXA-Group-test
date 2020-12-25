import {
    SET_USERS_DATA,
} from "../actions/AppActions.js";

const initialState = {
    users: []
};

const appReducer = function(state = initialState, action) {
    switch (action.type) {
        case SET_USERS_DATA: {
            return {
                ...state,
                users: action.data
            };
        }
        default: {
            return state;
        }
    }
};

export default appReducer;
