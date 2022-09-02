import React, { useEffect, useState, useRef } from 'react';
import Messages from "./Messages";
import moment from 'moment'
import {
    requestMessage,
    AddMessageUserCreator,
    ShowChatCreator, ShowContactsCreator
} from "../../redux/actions";
import {connect} from "react-redux";


function Chat(props) {
    const [messageText, setMessageText] = useState('');
    const coverMessagesRef = useRef();
    const reformatDateMoment = (date) => {
        let dateLocal = moment(date);
        if(!date) dateLocal = moment();
        return `${dateLocal.format('L')}, ${dateLocal.format('LT')}`;
    }
    let img, chat, name;
    if(props.active_chat){
        img = props.contacts.find(item => item.id === props.active_chat ).img;
        chat = props.chats.find(item => item.id === props.active_chat ).chat;
        name = props.contacts.find(item => item.id === props.active_chat ).name;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        props.AddMessageUserCreator(messageText, props.active_chat); //Добавляємо повідомлення в чат
        setMessageText('');
        props.requestMessage(); //Відправляємо запит на API з затримкою повідомлення від контакта в чат
    };
    const handleChangeInput = (event) => {
        setMessageText(event.target.value);
    };
    const backHandler = () => {
        props.ShowChatCreator(false);
        props.ShowContactsCreator(true);
    }
    useEffect(() => {
        if(props.active_chat){
            coverMessagesRef.current.scrollTo(0, coverMessagesRef.current.scrollHeight);
        }
    }, [props.chats, props.active_chat]);
    if(!props.active_chat){
        return (
            <div className="Chat">
                <div className="header">
                </div>
                <h3>Select a chat</h3>
            </div>
        )
    }
    return (
        <div className="Chat">
            <div className="header">
                <div className="back" onClick={backHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 330 330" ><path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606C255,161.018,253.42,157.202,250.606,154.389z"/></svg>
                </div>
                <div className="userFoto checked">
                    <img src={require(`../../img/${img}`)} alt='userFoto' loading="lazy" height="50" width="50"/>
                    <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 305.002 305.002">
                        <g>
                            <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5
                            S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5
                            c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"/>
                            <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678
                            l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385
                            c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"/>
                        </g>
                    </svg>
                </div>
                <div className="name">{name}</div>
            </div>

            <div className="coverMessages" ref={coverMessagesRef}>
                {
                    chat.map(item => (
                        <Messages
                            key={item.id}
                            img={img}
                            value={item.value}
                            is_contact_value={item.is_contact_value}
                            date={reformatDateMoment(item.date)}
                        />
                    ))
                }
            </div>
            <form className="coverInput" onSubmit={handleSubmit}>
                <input type="text" onChange={handleChangeInput} value={messageText}/>
                <button type="submit">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 512.001 512.001">
                        <g>
                            <path d="M483.927,212.664L66.967,25.834C30.95,9.695-7.905,42.024,1.398,80.367l21.593,89.001 c3.063,12.622,11.283,23.562,22.554,30.014l83.685,47.915c6.723,3.85,6.738,13.546,0,17.405l-83.684,47.915 c-11.271,6.452-19.491,17.393-22.554,30.015L1.398,431.633c-9.283,38.257,29.507,70.691,65.569,54.534l416.961-186.83 C521.383,282.554,521.333,229.424,483.927,212.664z M468.609,265.151l-416.96,186.83c-7.618,3.417-15.814-3.398-13.845-11.516 l21.593-89.001c0.647-2.665,2.383-4.975,4.761-6.337l83.685-47.915c31.857-18.239,31.887-64.167,0-82.423l-83.685-47.916 c-2.379-1.362-4.115-3.672-4.761-6.337L37.804,71.535c-1.945-8.016,6.128-14.975,13.845-11.514L468.61,246.85 C476.522,250.396,476.542,261.596,468.609,265.151z"/>
                            <path d="M359.268,238.907l-147.519-66.1c-9.444-4.231-20.523-0.005-24.752,9.435c-4.231,9.44-0.006,20.523,9.434,24.752 L305.802,256l-109.37,49.006c-9.44,4.231-13.664,15.313-9.434,24.752c4.231,9.443,15.312,13.663,24.752,9.435l147.519-66.101 C373.996,266.495,374.006,245.51,359.268,238.907z"/>
                        </g>
                    </svg>
                </button>
            </form>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        chats: state.appState.chats,
        contacts: state.appState.contacts,
        active_chat: state.functionalityReducer.active_chat
    }
}
const mapDispatchToProps =  {
    requestMessage,
    AddMessageUserCreator,
    ShowChatCreator,
    ShowContactsCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
