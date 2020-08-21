import React from "react";
import s from '../generalChat/GeneralChat.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {AuthStateType, loginAC} from "../../reducers/authReducer";
import {Redirect} from "react-router-dom";
import {BusinessMessages} from "./businessMessages/BusinessMessages";

export const BusinessChat = () => {

    const dispatch = useDispatch();
    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {isLogin} = authState;

    if (!isLogin) {
        if (localStorage.getItem('isAuth')) {
            dispatch(loginAC(true))
        } else {
            return <Redirect to={'/login'}/>
        }
    }

    return (
        <div className={s.chatRoom}>
            <div className={'container'}>
                <BusinessMessages/>
            </div>
        </div>
    )
}