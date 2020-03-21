import {SIGN_IN, SIGN_IN_ER , SIGN_UP, SIGN_UP_ERR,ADMIN_SIGN,LOG_OUT } from "../Actions/Auth";


let initialState = {
    isAdmin: false,
    isAuth : false,
};

let authReducer = (state=initialState , action) => {
    switch(action.type) {
        case SIGN_IN: 
        return {
            ...state,
            user : action.user,
            isAuth : true, 
        }
        case SIGN_IN_ER:
        return {
            ...state,
            error : action.err,
            isAuth : false,
        }
        case SIGN_UP :
        return {
            ...state,
            isAuth:true,
            user: action.user,
        }
        case SIGN_UP_ERR:
            return {
                ...state,
                isAuth:false,
                error:action.err
            }
            case ADMIN_SIGN :
                return {
                    ...state,
                    isAuth:true,
                    isAdmin:true,
                    user : action.userData,
                }

            case LOG_OUT : 
            return {
                ...state,
                isAuth:false,
                isAdmin:false,
            }
            default:
                return {
                    ...state
                }
    }
};

export default authReducer;