import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store/store";
import {jsonApi} from "../api/jsonApi";

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_ERROR = 'SET_ERROR';

type LoginACType = {
    type: typeof LOGIN
    isAuth: boolean
};
type LogoutACType = {
    type: typeof LOGOUT
    isAuth: boolean
};
type SetErrorACType = {
    type: typeof SET_ERROR
    error: string
};

export const loginAC = (isAuth: boolean): LoginACType => {
    return {
        type: LOGIN,
        isAuth
    }
};
export const logoutAC = (isAuth: boolean): LogoutACType => {
    return {
        type: LOGOUT,
        isAuth
    }
};
const setErrorAC = (error: string): SetErrorACType => {
    return {
        type: SET_ERROR,
        error
    }
};

type ActionTypes = LoginACType | SetErrorACType | LogoutACType;

export type AuthStateType = {
    isLogin: boolean
    error: string
};

const initState: AuthStateType = {
    isLogin: false,
    error: "",
};

export const authReducer = (state: AuthStateType = initState, action: ActionTypes) => {
    switch (action.type) {
        case LOGIN:
            return {...state, isLogin: action.isAuth};
        case LOGOUT:
            return {...state, isLogin: action.isAuth};
        case SET_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
export const loginTC = (email: string, password: string) => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    const res = await jsonApi.login();
    if (res.email === email && res.password === password) {
        dispatch(loginAC(true));
        localStorage.setItem('isAuth', 'true');
    } else {
        dispatch(setErrorAC('Email or password is wrong'));
        setTimeout(() => {
            dispatch(setErrorAC(''))
        }, 3000)
    }
};
export const logoutTC = () => (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(logoutAC(false));
    localStorage.removeItem('isAuth');
};