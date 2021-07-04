import React, {useEffect, useRef, useState} from "react";
import './Chat.scss'
import socket from "../../socket";


export const Chat = ({users, messages, userName, roomId, onAddMessage}) => {

    const [messageValue, setMessageValue] = useState('');

    console.log(userName)

    const messageRef = useRef(null)

    const onSendMessage = () => {
        if (messageValue && messageValue.trim()) {
            socket.emit('ROOM: NEW_MESSAGE', {
                userName,
                roomId,
                text: messageValue
            })
            onAddMessage({userName, text: messageValue})

            setMessageValue('')
        }
        else {
            alert('Сообщение не может быть пустым!')
        }
    }

    const enterHandlerMessage = (e) => {
        if (e.key === 'Enter') {
            onSendMessage()
        }
    }

    useEffect(() => {
        messageRef.current.scrollTo(0, 9999)
    }, [messages]);


    return (
        <div className={'chat'}>
            <div className={'chat__main'}>
                <div className={'chat__viewport'}>
                    <div className={'chat__users'}>
                        <b>Комната: {roomId}</b>
                        <hr/>
                        <b>Пользователи ({users.length}):</b>
                        <ul>
                            {users.map((name, index) => <li className={'chat__user'} key={name + index}>{name}</li>)}
                        </ul>
                    </div>

                    <div className={'chat__messages-block'}>
                        <div ref={messageRef} className={'chat__message-block'}>
                            {
                                messages.map((message, index) => (
                                    <div key={index} className={message.userName === userName ? 'chat__message-own' : 'chat__message'}>
                                        <p>{message.text}</p>
                                        <span>{message.userName}</span>
                                    </div>
                                ))
                            }
                        </div>
                        <hr/>
                        <div className={'chat__manipulate'}>
                            <textarea value={messageValue}
                                      onKeyDown={enterHandlerMessage}
                                      onChange={e => setMessageValue(e.target.value)}
                                      name="message"
                                      cols="30"
                                      rows="3" />

                            <div className={'chat__send-btn'} onClick={onSendMessage}>
                                <p>Отправить</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}