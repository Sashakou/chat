import {
    USERS,
    LOADER,
    ACTIVE_CHAT,
    ADD_MESSAGE,
    ADD_MESSAGE_USER,
    ADD_MESSAGE_CONTACT,
    SORT_CONTACT,
} from '../actionsTypes';
import moment from "moment";

let initialState = {
    contacts: [
        {
            name: 'Alice Freeman',
            id: 1,
            img: 'Alice_Freeman.jpeg'
        },
        {
            name: 'Velazquez',
            id: 2,
            img: 'Velazquez.jpeg'
        },
        {
            name: 'Josefina',
            id: 3,
            img: 'girl.jpeg'
        },
        {
            name: 'VelazquezSiri',
            id: 4,
            img: 'ghgh.jpeg'
        },
        {
            name: 'Bob',
            id: 5,
            img: 'Velazquez.jpeg'
        }
    ],
    chats: [
        {
            id: 1,
            chat: [
                {
                    value: 'Hi!!! 💗',
                    is_contact_value: true,
                    date: '2020-01-05 13:42:30.177068'
                },
                {
                    value: 'Quickly come to the meeting room 1B, we have a big server issue',
                    is_contact_value: false,
                    date: '2020-01-06 13:42:30.177068'
                },
                {
                    value: 'meeting room 1B, we have a big server issue &#128516;',
                    is_contact_value: true,
                    date: '2021-01-07 15:43:30.177068'
                }
            ]
        },
        {
            id: 2,
            chat: [
                {
                    value: 'Hi!!!   ',
                    is_contact_value: true,
                    date: '2020-01-05 13:42:30.177068'
                },
                {
                    value: 'Hi!!!',
                    is_contact_value: false,
                    date: '2020-01-05 13:42:30.177068'
                },
                {
                    value: 'Hi!!!',
                    is_contact_value: true,
                    date: '2020-01-05 13:42:30.177068'
                },
                {
                    value: 'ha-ha-ha :) 😍',
                    is_contact_value: true,
                    date: '2020-01-05 13:42:30.177068'
                }
            ]
        },
        {
            id: 3,
            chat: [
                {
                    value: 'Hi!!!',
                    is_contact_value: true,
                    date: '2020-01-05 13:42:30.177068'
                },
                {
                    value: 'Hi!!!😄',
                    is_contact_value: false,
                    date: '2020-01-05 13:42:30.177068'
                },
                {
                    value: 'Hi!!!',
                    is_contact_value: true,
                    date: '2020-01-05 13:42:30.177068'
                },
                {
                    value: 'love you',
                    is_contact_value: true,
                    date: '2021-11-25 18:42:30.177068'
                }
            ]
        },
        {
            id: 4,
            chat: [
                {
                    value: 'Hi!!!',
                    is_contact_value: true,
                    date: '2020-01-05 13:42:30.177068'
                },
            ]
        },
        {
            id: 5,
            chat: [
                {
                    value: 'Hi!!!😄',
                    is_contact_value: false,
                    date: '2020-01-05 13:42:30.177068'
                },
            ]
        }
    ]
}
// console.log(JSON.parse (window.localStorage.getItem('data')));
// console.log(Boolean(window.localStorage.getItem('data')));
if(window.localStorage.getItem('data')) initialState = JSON.parse(window.localStorage.getItem('data'));
let dateLocal = new Date();
//let dateNow = `${dateLocal.getFullYear()}-${("0" + (dateLocal.getMonth() + 1)).slice(-2)}-${dateLocal.getDate()} ${dateLocal.getHours()}:${dateLocal.getMinutes()}:${dateLocal.getSeconds()}.${dateLocal.getMilliseconds()}`;
let dateNow = `${moment().format()}`;

const appReducer = (state = initialState, action ) => {
    //console.log(state);
    //console.log(action);
    //console.log('zaushlo - commonReducer');
    // alert('state');
    // alert(state.contacts[0].name);
    switch (action.type) {
        case USERS:
            return {...state, users: action.payload}
        case LOADER:
            return {...state, loading: action.payload}
        case SORT_CONTACT:
            return {...state, contacts: action.payload}
        case ADD_MESSAGE_USER:
            //return {...state, chats: action.payload}
            let newMesUser = {
                value: action.payload,
                is_contact_value: false,
                date: dateNow
            }
            let copyChatUser = JSON.parse(JSON.stringify(state.chats));
            copyChatUser.find(item => item.id === action.id).chat.push(newMesUser);
            //console.log(copyChatUser);
            return {...state, chats: copyChatUser }
        case ADD_MESSAGE_CONTACT:
            //return {...state, chats: action.payload}
            let newMesContact = {
                value: action.payload,
                is_contact_value: true,
                date: dateNow
            }
            let copyChatContact = JSON.parse(JSON.stringify(state.chats));
            copyChatContact.find(item => item.id === action.id).chat.push(newMesContact);
            //console.log(copyChatContact);
            return {...state, chats: copyChatContact }
        default:
            return state;
    }
}

export default appReducer;


