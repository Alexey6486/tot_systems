import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import {reducer as reduxFormReducer} from 'redux-form';
import {generalMessagesReducer} from "../reducers/generalMessagesReducer";
import {authReducer} from "../reducers/authReducer";
import {businessMessagesReducer} from "../reducers/businessMessagesReducer";

const rootReducers = combineReducers({
    form: reduxFormReducer,
    generalMessagesReducer,
    authReducer,
    businessMessagesReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducers>;

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));