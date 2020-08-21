import React, {PropsWithChildren} from "react";
import s from '../../generalChat/GeneralChat.module.css';
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {Textarea} from "../../../utils/formFields/formFields";
import {useDispatch} from "react-redux";
import {addBusinessMessageTC} from "../../../reducers/businessMessagesReducer";

export type BusinessMessageType = {
    message: string
}

export const AddNewBusinessMessage = () => {

    const dispatch = useDispatch();

    const onSubmitHandler = (message: BusinessMessageType) => {
        dispatch(addBusinessMessageTC(message.message, 'admin_author'));
        dispatch(reset('NewBusinessMessageForm'));
    }

    return (
        <div className={s.newMessageForm}>
            <ReduxForm onSubmit={onSubmitHandler}/>
        </div>
    )
}

const NewBusinessMessageForm: React.FC<InjectedFormProps<BusinessMessageType>> = (props: PropsWithChildren<InjectedFormProps<BusinessMessageType>>) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Textarea} name="message" type={'text'} placeholder={'text your message'}/>
                </div>
                <div>
                    <button className={s.sendMessage}>Send message</button>
                </div>
            </form>
        </div>
    )
}

const ReduxForm = reduxForm<BusinessMessageType>({
    form: 'NewBusinessMessageForm'
})(NewBusinessMessageForm)