import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_START
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case USER_LOGIN_START:
            return { ...state, loading: true, error: '' };

        case USER_LOGIN_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };

        case USER_LOGIN_FAIL:
            return { ...state,
                error: 'Authentication failed!',
                password: '',
                loading: false
            };

        case USER_LOGOUT_SUCCESS:
            return INITIAL_STATE;


        default:
            return state;
    }
};
