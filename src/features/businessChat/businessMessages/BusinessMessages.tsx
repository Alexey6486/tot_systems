import React, {useEffect} from "react";
import s from '../../generalChat/GeneralChat.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {EditableField} from "../../../utils/editableField/EditableField";
import deleteImg from '../../../assets/images/delete.png';
import {
    BusinessChatStateType,
    deleteBusinessMessageTC,
    editBusinessMessageTC,
    getBusinessMessagesTC
} from "../../../reducers/businessMessagesReducer";
import {AddNewBusinessMessage} from "../newBusinessMessage/NewBusinessMessage";

export const BusinessMessages = () => {

    const dispatch = useDispatch();
    const chatState = useSelector<AppRootStateType, BusinessChatStateType>(state => state.businessMessagesReducer);
    const {chat} = chatState;

    const chatMap = chat.map(message => {

        const onRemoveMessageHandler = () => {
            dispatch(deleteBusinessMessageTC(message.id))
        };

        const onEditMessageHandler = (text: string) => {
            dispatch(editBusinessMessageTC(message.id, text, message.author))
        };

        const checkUser = message.author === 'admin_author';

        return (
            <div className={checkUser ? `${s.message} ${s.author}` : s.message} key={message.id}>
                <div className={s.message__author}>{message.author} <span>said:</span></div>
                <EditableField title={message.message} editTask={onEditMessageHandler} checkUser={checkUser}/>
                {
                    checkUser &&
                    <button className={s.message__remove} onClick={onRemoveMessageHandler}>
                        <img src={deleteImg} alt=""/>
                    </button>
                }
            </div>
        );
    });

    useEffect(() => {
        dispatch(getBusinessMessagesTC())
    }, []);

    return (
        <div className={s.messagesBox}>
            <div className={s.messagesBox__inner}>
                {chatMap}
            </div>
            <AddNewBusinessMessage/>
        </div>
    )
}