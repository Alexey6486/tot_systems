import {jsonApi, MessageType} from "../api/jsonApi";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppRootStateType } from "../store/store";

const GET_GENERAL_MESSAGES = 'GET_GENERAL_MESSAGES';
const ADD_GENERAL_MESSAGE = 'ADD_GENERAL_MESSAGE';
const DELETE_GENERAL_MESSAGE = 'DELETE_GENERAL_MESSAGE';
const EDIT_GENERAL_MESSAGE = 'EDIT_GENERAL_MESSAGE';

export type getGeneralMessagesACType = {
    type: typeof GET_GENERAL_MESSAGES
    chat: Array<MessageType>
};
export type addGeneralMessageACType = {
    type: typeof ADD_GENERAL_MESSAGE
    id: string,
    message: string,
    author: string,
};
export type deleteGeneralMessageACType = {
    type: typeof DELETE_GENERAL_MESSAGE
    id: string
};
export type editGeneralMessageACType = {
    type: typeof EDIT_GENERAL_MESSAGE
    id: string
    message: string
};

const getGeneralMessagesAC = (chat: Array<MessageType>): getGeneralMessagesACType => {
    return {
        type: GET_GENERAL_MESSAGES,
        chat,
    }
};
const addGeneralMessageAC = (message: string, author: string, id: string): addGeneralMessageACType => {
    return {
        type: ADD_GENERAL_MESSAGE,
        id,
        message,
        author,
    }
};
const deleteGeneralMessageAC = (id: string): deleteGeneralMessageACType => {
    return {
        type: DELETE_GENERAL_MESSAGE,
        id,
    }
};
const editGeneralMessageAC = (id: string, message: string): editGeneralMessageACType => {
    return {
        type: EDIT_GENERAL_MESSAGE,
        id,
        message,
    }
};

type ActionTypes = getGeneralMessagesACType | addGeneralMessageACType | deleteGeneralMessageACType | editGeneralMessageACType;

export type ChatStateType = {
    chat: Array<MessageType>,
}

const messagesInitState: ChatStateType = {
    chat: [],
};

export const generalMessagesReducer = (state: ChatStateType = messagesInitState, action: ActionTypes) => {
    switch (action.type) {
        case GET_GENERAL_MESSAGES:
            return {...state, chat: action.chat};
        case ADD_GENERAL_MESSAGE:
            const newMsg = {
                id: action.id,
                message: action.message,
                author: action.author,
            }
            return {...state, chat: [...state.chat, newMsg]};
        case EDIT_GENERAL_MESSAGE:
            return {...state, chat: state.chat.map(message => message.id === action.id ? {...message, message: action.message} : message)};
        case DELETE_GENERAL_MESSAGE:
            return {...state, chat: state.chat.filter(message => message.id !== action.id)};
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
export const getGeneralMessagesTC = (): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    const res = await jsonApi.getGeneralMessages();
    dispatch(getGeneralMessagesAC(res));
};
export const addGeneralMessageTC = (message: string, author: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    const res = await jsonApi.addGeneralMessage(message, author);
    dispatch(addGeneralMessageAC(message, author, res.id));
};
export const deleteGeneralMessageTC = (id: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    const res = await jsonApi.deleteGeneralMessage(id);
    dispatch(deleteGeneralMessageAC(id));
};
export const editGeneralMessageTC = (id: string, message: string, author: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    const res = await jsonApi.editGeneralMessage(id, message, author);
    dispatch(editGeneralMessageAC(id, message));
};
