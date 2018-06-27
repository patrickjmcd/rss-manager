import firebase from 'firebase';

// import { persistor } from '..';

import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_START
} from './types';


export const userLogout = () => {
    console.log('user logout');
    return (dispatch) => {
        firebase.auth().signOut().then(() => {
            console.log(USER_LOGOUT_SUCCESS);
            dispatch({
                type: USER_LOGOUT_SUCCESS,
            });
        }).catch((error) => {
          console.log(error);
        });
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: user
    });
};

const loginUserFail = (dispatch) => {
    dispatch({ type: USER_LOGIN_FAIL });
};

export const userLogin = ({ email, password }) => {
    console.log('attempting login for ', email);
    return (dispatch) => {
        dispatch({ type: USER_LOGIN_START });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => loginUserSuccess(dispatch, user))
                .catch(() => loginUserFail(dispatch));
            });
    };
};
