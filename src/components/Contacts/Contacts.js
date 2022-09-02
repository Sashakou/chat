import React, { useEffect, useState, useRef } from 'react';
import ContactsItem from "./ContactsItem";
import {connect} from "react-redux";
import {
    ChangeActiveChatCreator,
    DeleteIdNewMessageCreator,
    ShowChatCreator,
    ShowContactsCreator
} from "../../redux/actions";
import moment from "moment";

function Contacts(props) {
    let contacts = props.appState.contacts;
    let chats = props.appState.chats;
    let arrIdNewMessage = props.functionalityReducer.new_message_alert;
    let active_chat = props.functionalityReducer.active_chat;
    const reformatDateMoment = (date) => {
        let dateLocal = moment(date);
        return `${dateLocal.format('ll')}`;
    }
    const findChatByIDCover = (chat) => {
        return function(id) {
            return chat.find(item => item.id === id ).chat[chat.find(item => item.id === id ).chat.length - 1];
        }
    }
    const findChatByID = findChatByIDCover(chats);
    const contactsItemHeandler = (id) => {
        console.log(id);
        props.ChangeActiveChatCreator(id);
        props.DeleteIdNewMessageCreator(id);
        if(document.documentElement.clientWidth < 768){
            props.ShowChatCreator(true);
            props.ShowContactsCreator(false);
        }
    }
    useEffect(() => {
        if(arrIdNewMessage.find(item => item === active_chat)){
            props.DeleteIdNewMessageCreator(arrIdNewMessage.find(item => item === active_chat));
        }
    }, [arrIdNewMessage]);
    return (
        <div className="Contacts">
            <h3>Chats</h3>
            <div className="contactsItems">
                {
                    contacts.map(item => (
                        <ContactsItem
                            key={item.id}
                            contactsItemHeandler={() => contactsItemHeandler(item.id)}
                            id={item.id}
                            img={item.img}
                            name={item.name}
                            lastMessage={findChatByID(item.id).value}
                            date={reformatDateMoment(findChatByID(item.id).date)}
                            active={props.functionalityReducer.active_chat}
                            arrIdNewMessage={arrIdNewMessage}
                        />
                    ))
                }
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        appState: state.appState,
        functionalityReducer: state.functionalityReducer
    }
}
const mapDispatchToProps =  {
    ChangeActiveChatCreator,
    DeleteIdNewMessageCreator,
    ShowChatCreator,
    ShowContactsCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
