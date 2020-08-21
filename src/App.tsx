import React from 'react';
import './App.css';
import {GeneralChat} from "./features/generalChat/GeneralChat";
import {Route} from 'react-router-dom';
import {MainPage} from "./features/mainPage/MainPage";
import {Login} from "./features/login/Login";
import { Header } from './features/header/Header';
import {BusinessChat} from "./features/businessChat/BusinessChat";

export const App = () => {
    return (
        <div className="App">
            <Header/>
            <Route exact path='/' render={() => <MainPage/>}/>
            <Route exact path='/login' render={() => <Login/>}/>
            <Route exact path='/generalChat' render={() => <GeneralChat/>}/>
            <Route exact path='/businessChat' render={() => <BusinessChat/>}/>
        </div>
    );
}

