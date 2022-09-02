import React, { useEffect } from 'react';
import Search from "../Search/Search";
import Contacts from "../Contacts/Contacts";
import {Alert} from "../Alert/Alert";
import Chat from "../Chat/Chat";
import {ShowChatCreator, ShowContactsCreator} from "../../redux/actions";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

function CoverChat(props) {
    console.log(props);
    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    const navigate = useNavigate();
    useEffect(() => {
        if(!props.authorized) navigate('/sing-in');
    }, [props.authorized]);
    return (
        <>
            {
                props.authorized
                    ? <div className="App">
                        {props.alert && <Alert text={props.alert_text} />}
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
    return {
        show_chat: state.functionalityReducer.show_chat,
        show_contacts: state.functionalityReducer.show_contacts,
        authorized: state.functionalityReducer.authorized,
        alert: state.functionalityReducer.alert,
        alert_text: state.functionalityReducer.alert_text
    }
}
const mapDispatchToProps =  {
    ShowChatCreator, ShowContactsCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(CoverChat);