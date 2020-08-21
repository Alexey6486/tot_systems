import React, {useEffect} from "react";
import s from '../GeneralChat.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {
    ChatStateType,
    deleteGeneralMessageTC,
    editGeneralMessageTC,
    getGeneralMessagesTC
} from "../../../reducers/generalMessagesReducer";
import {AddNewGeneralMessage} from "../newGeneralMessage/NewGeneralMessage";
import {EditableField} from "../../../utils/editableField/EditableField";
import deleteImg from '../../../assets/images/delete.png';

export const GeneralMessages = () => {

    const dispatch = useDispatch();
    const chatState = useSelector<AppRootStateType, ChatStateType>(state => state.generalMessagesReducer);
    const {chat} = chatState;

    const chatMap = chat.map(message => {

        const onRemoveMessageHandler = () => {
            dispatch(deleteGeneralMessageTC(message.id))
        };

        const onEditMessageHandler = (text: string) => {
            dispatch(editGeneralMessageTC(message.id, text, message.author))
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
        dispatch(getGeneralMessagesTC())
    }, []);

    return (
        <div className={s.messagesBox}>
            <div className={s.messagesBox__inner}>
                {chatMap}
            </div>
            <AddNewGeneralMessage/>
        </div>
    )
}