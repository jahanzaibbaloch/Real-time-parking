import * as firebase from "firebase";
import {useHistory,useLocation} from "react-router-dom";
export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_ER = "SIGN_IN_ERR";
export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_ERR = "SIGN_UP_ERR";
export const ADMIN_SIGN = "ADMIN_SIGN";
export const LOG_OUT = "LOG_OUT";

export const signIn = (User) => {
    return (dispatch) => {
        firebase.auth()
            .signInWithEmailAndPassword(User.username, User.password)
            .then(() => {
                firebase.auth().onAuthStateChanged(function(user) {
                    console.log(user)
                    if (user.email === "admin@test.com") {
                      // User is signed in.
                      dispatch({ type: ADMIN_SIGN, user: user })
                    } else if (user) {
                        dispatch({ type: SIGN_IN, user: user })
                    }
                  });
               
            }).catch((error) => {
                dispatch({ type: SIGN_IN_ER, err: error })
            })
    };
};

export const signUp = (userData) => {
    return (dispatch) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(userData.email, userData.password)
            .then((user) => {
                dispatch({ type: SIGN_UP, newUser: user })
            })
            .catch((error) => {
                dispatch({
                    type: SIGN_UP_ERR, err: error
                })
            })
    };
};

export const logOut = () => {
    return (dispatch) => {
        firebase.auth().signOut();
        dispatch({ type: LOG_OUT });
    };

};