import React, {PropsWithChildren} from "react";
import s from './Login.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../utils/formFields/formFields";
import {requiredField} from "../../utils/formValidation/formValidation";
import {useDispatch, useSelector} from "react-redux";
import {AuthStateType, loginAC, loginTC} from "../../reducers/authReducer";
import {AppRootStateType} from "../../store/store";
import {Redirect} from "react-router-dom";

type LoginDataType = {
    email: string
    password: string
}

export const Login = () => {

    const dispatch = useDispatch();
    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {isLogin} = authState;

    const onSubmit = (formData: LoginDataType) => {
        dispatch(loginTC(formData.email, formData.password));
    }

    if (!isLogin) {
        if (localStorage.getItem('isAuth')) {
            dispatch(loginAC(true))
            return <Redirect to={'/'}/>
        }
    }
    if (isLogin) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={s.loginBlock}>
            <div className={s.loginWrap}>
                <div className={s.loginTitle}>Login</div>
                <LoginReduxForm onSubmit={onSubmit}/>
                <div className={s.loginInfo}>
                    <p>To authorize use:</p>
                    <p>email: test@test.com</p>
                    <p>password: 123456</p>
                </div>
            </div>
        </div>
    )
};

const LoginForm: React.FC<InjectedFormProps<LoginDataType>> = (props: PropsWithChildren<InjectedFormProps<LoginDataType>>) => {

    const authState = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer);
    const {error} = authState;

    return (
        <form className={s.loginForm} onSubmit={props.handleSubmit}>
            <div className={s.loginFieldsGroup}>
                <Field component={Input} name={'email'} type={'email'} placeholder={'email'}
                       validate={[requiredField]}/>
                <Field component={Input} name={'password'} type={'password'} placeholder={'password'}
                       validate={[requiredField]}/>
                {error && <div className={s.loginError}>{error}</div>}
            </div>
            <button className={s.loginBtn}>LogIn</button>
        </form>
    )
}
const LoginReduxForm = reduxForm<LoginDataType>({
    form: 'LoginForm'
})(LoginForm);