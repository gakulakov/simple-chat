import React, {useState} from "react";
import axios from "axios";


export const AuthBlock = ({onLogin}) => {

    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onEnter = async () => {
        if (!roomId || !userName) {
            return alert('Введите корректные данные')
        }

        const obj = {
            roomId,
            userName
        }

        setIsLoading(true)
        await axios.post('/rooms', obj)
        onLogin(obj )
    }

    return (
        <div className="app">
            <div className={'app__auth'}>
                <input onChange={(e) => setRoomId(e.target.value)} className={'app__input-auth'} type="text" placeholder={'Room ID'} value={roomId}/>
                <input onChange={(e) => setUserName(e.target.value)} className={'app__input-auth'} type="text" placeholder={'Ваше имя'} value={userName}/>
                <button className={'app__button'} disabled={isLoading} onClick={onEnter}>{isLoading ? 'Вход...' : 'Войти'}</button>
            </div>
        </div>
    )
}