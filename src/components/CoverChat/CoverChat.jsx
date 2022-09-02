import React, { useEffect } from 'react';
import Search from "../Search/Search";
import Contacts from "../Contacts/Contacts";
import Chat from "../Chat/Chat";
import {ShowChatCreator, ShowContactsCreator} from "../../redux/actions";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

function CoverChat(props) {
    console.log(props);
    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    const handlerResize = () => {
        // console.log('width', document.documentElement.clientWidth);
        // console.log('height', document.documentElement.clientHeight);
        if(document.documentElement.clientWidth > 768){
            props.ShowChatCreator(true);
            props.ShowContactsCreator(true);
        }else if(document.documentElement.clientWidth < 768){
            props.ShowChatCreator(false);
            props.ShowContactsCreator(true);
        }
    }
    const navigate = useNavigate();
    useEffect(() => {
        //alert('CoverChat', props.authorized);
        //console.log(!props.authorized);

        if(!props.authorized) navigate('/sing-in'); //Важливо!!!

    }, [props.authorized]);
    useEffect(() => {
        //console.log(props.authorized);
        //console.log(!props.authorized);
        if(!props.authorized) navigate('/sing-in');
        // window.gapi.load('auth2', () => {
        //     console.log(' Ready. Make a call to gapi.auth2.init or some other API ');
        //     window.gapi.auth2.init({
        //         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
        //     })
        // });
        //window.addEventListener("resize", handlerResize);
        if(document.documentElement.clientWidth > 768){
            props.ShowChatCreator(true);
            props.ShowContactsCreator(true);
        }else if(document.documentElement.clientWidth < 768){
            props.ShowChatCreator(false);
            props.ShowContactsCreator(true);
        }
    }, []);
    //alert('CoverChat show_chat', props.show_chat);
    //alert(props.show_chat);
    //alert('CoverChat show_contacts', props.show_contacts);
    //alert(props.show_contacts);
    return (
        <>
            {
                props.authorized
                    ? <div className="App">
                        {
                            props.show_contacts
                                ?   <div className="coverContacts">
                                    <Search/>
                                    <Contacts/>
                                </div>
                                : null
                        }
                        {
                            props.show_chat
                                ?   <div className="coverChat"><Chat/></div>
                                : null
                        }
                    </div>
                    : 'loading...'
            }
        </>
    );
}
const mapStateToProps = state => {
    //console.log(state);
    return {
        show_chat: state.functionalityReducer.show_chat,
        show_contacts: state.functionalityReducer.show_contacts,
        authorized: state.functionalityReducer.authorized
    }
}
const mapDispatchToProps =  {
    ShowChatCreator, ShowContactsCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(CoverChat);