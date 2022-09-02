import React, { useEffect, useState, useRef } from 'react';
import {AuthorizedCreator, ShowChatCreator, ShowContactsCreator, UserDataCreator} from "../../redux/actions";
import {connect} from "react-redux";
import {GoogleLogin} from 'react-google-login';
import {useNavigate} from "react-router-dom";
import {gapi} from "gapi-script";
//import { GoogleLogin } from '@react-oauth/google';
//import { GoogleOAuthProvider } from '@react-oauth/google';
function Singin(props) {
    //alert('Singin');
    //console.log(props);
    //console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    const responseSuccessGoogle = (response) => {
        console.log(gapi);
        console.log(gapi.auth.getToken().access_token);
        console.log(response);
       // console.log(response.profileObj.imageUrl);
        props.AuthorizedCreator(true);
        props.UserDataCreator(response.profileObj.name, response.profileObj.imageUrl);
    }
    const responseFailureGoogle = (response) => {
        console.log(response);
    }
    const navigate = useNavigate();
    useEffect(() => {
        console.log(props.authorized);
        if(props.authorized) navigate('/');
    }, [props.authorized]);
    return (
        <div className="SingIn">
            <div className="coverLogin">
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Log in with Google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseFailureGoogle}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
                {/*<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>*/}
                {/*    google login*/}
                {/*</GoogleOAuthProvider>*/}
                {/*<GoogleLogin*/}
                {/*    onSuccess={credentialResponse => {*/}
                {/*        console.log(credentialResponse);*/}
                {/*    }}*/}
                {/*    onError={() => {*/}
                {/*        console.log('Login Failed');*/}
                {/*    }}*/}
                {/*/>*/}
            </div>
        </div>
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
    ShowChatCreator, ShowContactsCreator, AuthorizedCreator, UserDataCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(Singin);