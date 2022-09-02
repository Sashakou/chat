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
    //alert('Contacts');
    const [newMessage, setNewMessage] = useState(false);
    //console.log(props);
    let contacts = props.appState.contacts;
    let chats = props.appState.chats;
    let arrIdNewMessage = props.functionalityReducer.new_message_alert;
    let active_chat = props.functionalityReducer.active_chat;
    //console.log('contacts:', contacts);
    //console.log('chats:', chats);
    const reformatDate = (date) => {
        //console.log(date);
        let dateLocal = new Date(date);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        let day = dateLocal.getDate();
        let month = monthNames[dateLocal.getMonth()].substr(0, 3);
        let year = dateLocal.getFullYear();
        console.log(`${month} ${day}, ${year}`);
        return ( `${month} ${day}, ${year}`);
    }
    const reformatDateMoment = (date) => {
        let dateLocal = moment(date);
        //return `${month}/${day}/${year}, ${hou}:${min}`;
        console.log( `${dateLocal.format('ll')}`) ;
        return `${dateLocal.format('ll')}`;
    }
    const findChatByIDCover = (chat) => {
        //console.log(chat);
        return function(id) {
            //console.log(id);
            //return chat.find(item => item.id === id ).chat[chat.find(item => item.id === id ).chat.length - 1].value;
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
    //alert(reformatDate("2020-01-06 13:42:30.177068"));
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
                            //date={reformatDate(findChatByID(item.id).date)}
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
    //console.log(state);
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
