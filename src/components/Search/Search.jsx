import React, { useEffect, useState, useRef } from 'react';
import {ChangeActiveChatCreator, AuthorizedCreator} from "../../redux/actions";
import {connect} from "react-redux";
import { GoogleLogout } from 'react-google-login';
function Search(props) {
    let contacts = props.appState.contacts;
    const [letters, setLetters] = useState('');
    const searchContByName = (event) => {
        setLetters(event.target.value);
    }
    const SearchItemHeandler = (id) => {
        props.ChangeActiveChatCreator(id);
        setLetters('');
    }
    const LogoutSuccessGoogle = () => {
        console.log('LogoutSuccessGoogle');
        props.AuthorizedCreator(false);
    }
    const responseFailureGoogle = (response) => {
        console.log(response);
    }
    return (
        <div className="searchBlock">
            <div className="userData">
                <div className="userFoto checked">
                    <img src={props.user_img} alt={props.user_name} loading="lazy" height="50" width="50"/>
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
                <div className="userName">{props.user_name}</div>
                <GoogleLogout
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Log out"
                    onLogoutSuccess={LogoutSuccessGoogle}
                    onFailure={responseFailureGoogle}
                />
            </div>
            <div className="coverInput">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 489.713 489.713">
                    <g>
                        <path d="M483.4,454.444l-121.3-121.4c28.7-35.2,46-80,46-128.9c0-112.5-91.5-204.1-204.1-204.1S0,91.644,0,204.144
                            s91.5,204,204.1,204c48.8,0,93.7-17.3,128.9-46l121.3,121.3c8.3,8.3,20.9,8.3,29.2,0S491.8,462.744,483.4,454.444z M40.7,204.144
                            c0-90.1,73.2-163.3,163.3-163.3s163.4,73.3,163.4,163.4s-73.3,163.4-163.4,163.4S40.7,294.244,40.7,204.144z"/>
                    </g>
                </svg>
                <input type="text" title="The search is case sensitive" placeholder="Search or start new chat" value={letters} onChange={searchContByName}/>
            </div>
            <div className="resSearch">
                {
                    letters
                    ? contacts.map((item) => {
                            console.log(letters);
                            let getLetters = item.name.slice(0, letters.length);
                            console.log(getLetters);
                            if(getLetters === letters){
                                console.log(item);
                                return <div className="resSearchItem" onClick={() => SearchItemHeandler(item.id)} key={item.id}>
                                    <img src={require(`../../img/${item.img}`)} alt='userFoto' loading="lazy" height="20" width="20"/>
                                    <span>{item.name}</span>
                                </div>
                            }
                        })
                    : null
                }
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        appState: state.appState,
        functionalityReducer: state.functionalityReducer,
        user_name: state.functionalityReducer.user_name,
        user_img: state.functionalityReducer. user_img
    }
}
const mapDispatchToProps =  {
    ChangeActiveChatCreator, AuthorizedCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
