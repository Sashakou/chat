import {
    USERS, REQUEST_USERS, ADD_MESSAGE_ALERT, ADD_MESSAGE_OBJ,
    LOADER, ACTIVE_CHAT, ADD_MESSAGE_CONTACT, REQUEST_MESSAGE,
    ADD_MESSAGE_USER, DELETE_MESSAGE_OBJ, DELETE_ID_NEW_MESSAGE, SORT_CONTACT,
    CHANGE_SHOW_CONTACTS, CHANGE_SHOW_CHAT, CHANGE_AUTHORIZED, CHANGE_USER_DATA
} from './actionsTypes';

export function GetUsersCreator(users) {
    return {
        type: USERS,
        payload: users
    }
}
export function requestUsers() {
    return {
        type: REQUEST_USERS
    }
}
export function LoaderCreator(val) {
    return {
        type: LOADER,
        payload: val
    }
}
export function ChangeActiveChatCreator(id) {
    return {
        type: ACTIVE_CHAT,
        payload: id
    }
}
export function AddMessageContactCreator(mes, id) {
    console.log(mes);
    console.log(id);
    return {
        type: ADD_MESSAGE_CONTACT,
        payload: mes,
        id: id
    }
}
// export function AddMessageUserCreator(mes) {
//     return {
//         type: ADD_MESSAGE_USER,
//         payload: mes
//     }
// }
export function AddMessageUserCreator(mes, id) {
    console.log(mes);
    console.log(id);
    return {
        type: ADD_MESSAGE_USER,
        payload: mes,
        id: id
    }
}
export function DeleteNewMessageArrCreator() {
    return {
        type: DELETE_MESSAGE_OBJ
    }
}
export function AddNewMessageArr(obj) {
    console.log(obj);
    return {
        type: ADD_MESSAGE_OBJ,
        payload: obj
    }
}
export function AddNewMessageAlert() {
    return {
        type: ADD_MESSAGE_ALERT

    }
}
export function requestMessage() {
    return {
        type: REQUEST_MESSAGE
    }
}
export function ShowContactsCreator(show) {
    return {
        type: CHANGE_SHOW_CONTACTS,
        payload: show
    }
}
export function ShowChatCreator(show) {
    return {
        type: CHANGE_SHOW_CHAT,
        payload: show
    }
}
export function DeleteIdNewMessageCreator(id) {
    return {
        type: DELETE_ID_NEW_MESSAGE,
        payload: id
    }
}
export function SortContactsCreator(obj) {
    return {
        type: SORT_CONTACT,
        payload: obj
    }
}
export function AuthorizedCreator(val) {
    return {
        type: CHANGE_AUTHORIZED,
        payload: val
    }
}
export function UserDataCreator(name, img) {
    return {
        type: CHANGE_USER_DATA,
        name: name,
        img: img
    }
}