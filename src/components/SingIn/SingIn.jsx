import React, { useEffect } from 'react';
import {AuthorizedCreator, ShowChatCreator, ShowContactsCreator, UserDataCreator} from "../../redux/actions";
import {connect} from "react-redux";
import {GoogleLogin} from 'react-google-login';
import {useNavigate} from "react-router-dom";
function Singin(props) {
    const responseSuccessGoogle = (response) => {
        props.AuthorizedCreator(true);
        props.UserDataCreator(response.profileObj.name, response.profileObj.imageUrl);
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(props.authorized) navigate('/');
    }, [props.authorized]);
    return (
        <div className="SingIn">
            <div className="coverLogin">
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Log in with Google"
                    onSuccess={responseSuccessGoogle}
                    //onFailure={responseFailureGoogle}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </div>
        </div>
    );
}
const mapStateToProps = state => {
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