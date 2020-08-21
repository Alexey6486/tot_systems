import {jsonApi, MessageType} from "../api/jsonApi";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppRootStateType } from "../store/store";

const GET_BUSINESS_MESSAGES = 'GET_BUSINESS_MESSAGES';
const ADD_BUSINESS_MESSAGE = 'ADD_BUSINESS_MESSAGE';
const DELETE_BUSINESS_MESSAGE = 'DELETE_BUSINESS_MESSAGE';
const EDIT_BUSINESS_MESSAGE = 'EDIT_BUSINESS_MESSAGE';

export type getBusinessMessagesACType = {
    type: typeof GET_BUSINESS_MESSAGES
    chat: Array<MessageType>
};
export type addBusinessMessageACType = {
    type: typeof ADD_BUSINESS_MESSAGE
    id: string,
    message: string,
    author: string,
};
export type deleteBusinessMessageACType = {
    type: typeof DELETE_BUSINESS_MESSAGE
    id: string
};
export type editBusinessMessageACType = {
    type: typeof EDIT_BUSINESS_MESSAGE
    id: string
    message: string
};

const getBusinessMessagesAC = (chat: Array<MessageType>): getBusinessMessagesACType => {
    return {
        type: GET_BUSINESS_MESSAGES,
        chat,
    }
};
const addBusinessMessageAC = (message: string, author: string, id: string): addBusinessMessageACType => {
    return {
        type: ADD_BUSINESS_MESSAGE,
        id,
        message,
        author,
    }
};
const deleteBusinessMessageAC = (id: string): deleteBusinessMessageACType => {
    return {
        type: DELETE_BUSINESS_MESSAGE,
        id,
    }
};
const editBusinessMessageAC = (id: string, message: string): editBusinessMessageACType => {
    return {
        type: EDIT_BUSINESS_MESSAGE,
        id,
        message,
    }
};

type ActionTypes = getBusinessMessagesACType | addBusinessMessageACType | deleteBusinessMessageACType | editBusinessMessageACType;

export type BusinessChatStateType = {
    chat: Array<MessageType>,
}

const messagesInitState: BusinessChatStateType = {
    chat: [],
};

export const businessMessagesReducer = (state: BusinessChatStateType = messagesInitState, action: ActionTypes) => {
    switch (action.type) {
        case GET_BUSINESS_MESSAGES:
            return {...state, chat: action.chat};
        case ADD_BUSINESS_MESSAGE:
            const newMsg = {
                id: action.id,
                message: action.message,
                author: action.author,
            }
            return {...state, chat: [...state.chat, newMsg]};
        case EDIT_BUSINESS_MESSAGE:
            return {...state, chat: state.chat.map(message => message.id === action.id ? {...message, message: action.message} : message)};
        case DELETE_BUSINESS_MESSAGE:
            return {...state, chat: state.chat.filter(message => message.id !== action.id)};
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
export const getBusinessMessagesTC = (): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    const res = await jsonApi.getBusinessMessages();
    dispatch(getBusinessMessagesAC(res));
};
export const addBusinessMessageTC = (message: string, author: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    const res = await jsonApi.addBusinessMessage(message, author);
    dispatch(addBusinessMessageAC(message, author, res.id));
};
export const deleteBusinessMessageTC = (id: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    const res = await jsonApi.deleteBusinessMessage(id);
    dispatch(deleteBusinessMessageAC(id));
};
export const editBusinessMessageTC = (id: string, message: string, author: string): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    const res = await jsonApi.editBusinessMessage(id, message, author);
    dispatch(editBusinessMessageAC(id, message));
};
