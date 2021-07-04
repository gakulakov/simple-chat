import React, {useEffect, useReducer} from "react";
import './App.scss';
import {AuthBlock} from "./components/AuthBlock/AuthBlock";
import socket from "./socket";
import reducer from "./reducer";
import {Chat} from "./components/Chat/Chat";
import axios from "axios";
import logo from './assets/Simple Chat.svg'


function App() {

    const [state, dispatch] = useReducer(reducer, {
        isAuth: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    });

    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        })
    }

    const addMessage = (message) => {
        dispatch({
            type: 'NEW_MESSAGE',
            payload: message
        })
    }

    const onLogin = async (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj
        })
        socket.emit('ROOM: JOIN', obj)
        const {data} = await axios.get(`https://simple-chat-123.herokuapp.com/rooms/${obj.roomId}`)

        dispatch({
            type: 'SET_DATA',
            payload: data
        })
    }

    useEffect(() => {
        socket.on('ROOM: SET_USERS', setUsers)
        socket.on('ROOM: NEW_MESSAGE', addMessage)
    }, []);


    return (
        <div className="App">
            {!state.isAuth ? <AuthBlock onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage} />}
        </div>
    );
}

export default App;
