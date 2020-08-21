import React from 'react';
import s from './MainPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {AuthStateType, loginAC} from "../../reducers/authReducer";
import {Redirect, NavLink} from 'react-router-dom';

export const MainPage = () => {

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
        <div className={s.mainPageBlock}>
            <NavLink className={s.chatRoomLink} to={'/businessChat'}>Business<br/>Chat</NavLink>
            <NavLink className={s.chatRoomLink} to={'/generalChat'}>General<br/>Chat</NavLink>
        </div>
    )
}