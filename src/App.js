import React, { useEffect, useState, useRef } from 'react';
import {ShowChatCreator, ShowContactsCreator} from "./redux/actions";
import {connect} from "react-redux";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import SingIn from "./components/SingIn/SingIn";
import CoverChat from "./components/CoverChat/CoverChat";
import {gapi} from "gapi-script";

function App(props) {
    const handlerResize = () => {
        if(document.documentElement.clientWidth > 768){
            props.ShowChatCreator(true);
            props.ShowContactsCreator(true);
        }else if(document.documentElement.clientWidth < 768){
            props.ShowChatCreator(false);
            props.ShowContactsCreator(true);
        }
    }
    useEffect(() => {

        const initClient = () => {
            gapi.client.init({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: ''
            })
        }
        gapi.load('client:auth2', initClient);
        window.addEventListener("resize", handlerResize);
        if(document.documentElement.clientWidth > 768){
            props.ShowChatCreator(true);
            props.ShowContactsCreator(true);
        }else if(document.documentElement.clientWidth < 768){
            props.ShowChatCreator(false);
            props.ShowContactsCreator(true);
        }
    }, []);
  return (
    <BrowserRouter>
        <Routes>
            <Route  path="/" element={ <CoverChat/> } />
            <Route  path="/sing-in" element={ <SingIn/> } />
            <Route
                path="*"
                element={
                    <main style={{ padding: "1rem" }}>
                        <p>Not found</p>
                    </main>
                }
            />
        </Routes>
    </BrowserRouter>
  );
}
const mapStateToProps = state => {
    return {
        show_chat: state.functionalityReducer.show_chat,
        show_contacts: state.functionalityReducer.show_contacts
    }
}
const mapDispatchToProps =  {
    ShowChatCreator, ShowContactsCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(App);