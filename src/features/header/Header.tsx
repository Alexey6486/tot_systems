import React from "react";
import s from "./Header.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AuthStateType, logoutTC} from "../../reducers/authReducer";
import {AppRootStateType} from "../../store/store";
import {NavLink} from "react-router-dom";

export const Header = () => {

    const dispatch = useDispatch();
    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {isLogin} = authState;

    const onLogoutHandler = () => {
        dispatch(logoutTC());
    }

    return (
        <div className={s.headerWrap}>
            <div className={'container'}>
                <div className={s.headerNav}>
                    <NavLink to={'/'} exact activeClassName={s.active}>Corporate Messenger</NavLink>
                    <NavLink to={'/businessChat'} exact activeClassName={s.active}>Business chat</NavLink>
                    <NavLink to={'/generalChat'} exact activeClassName={s.active}>General chat</NavLink>
                </div>
                {isLogin && <div className={s.logoutBtn} onClick={onLogoutHandler}>Logout</div>}
            </div>
        </div>
    )
}