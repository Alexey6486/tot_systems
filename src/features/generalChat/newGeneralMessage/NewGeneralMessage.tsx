import React, {PropsWithChildren} from "react";
import s from '../GeneralChat.module.css';
import {InjectedFormProps, reduxForm, Field, reset} from "redux-form";
import { Textarea } from "../../../utils/formFields/formFields";
import { useDispatch } from "react-redux";
import {addGeneralMessageTC} from "../../../reducers/generalMessagesReducer";

export type GeneralMessageType = {
    message: string
}

export const AddNewGeneralMessage = () => {

    const dispatch = useDispatch();

    const onSubmitHandler = (message: GeneralMessageType) => {
        dispatch(addGeneralMessageTC(message.message, 'admin_author'));
        dispatch(reset('NewGeneralMessageForm'));
    }

    return (
        <div className={s.newMessageForm}>
            <ReduxForm onSubmit={onSubmitHandler}/>
        </div>
    )
}

const NewGeneralMessageForm: React.FC<InjectedFormProps<GeneralMessageType>> = (props: PropsWithChildren<InjectedFormProps<GeneralMessageType>>) => {
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

const ReduxForm = reduxForm<GeneralMessageType>({
    form: 'NewGeneralMessageForm'
})(NewGeneralMessageForm)