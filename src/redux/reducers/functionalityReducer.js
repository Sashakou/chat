import {
    ACTIVE_CHAT, ADD_MESSAGE_OBJ, ADD_MESSAGE_ALERT,
    DELETE_ID_NEW_MESSAGE, DELETE_MESSAGE_OBJ, CHANGE_SHOW_CONTACTS,
    CHANGE_SHOW_CHAT, CHANGE_AUTHORIZED, CHANGE_USER_DATA
} from '../actionsTypes';

let initialState = {
    active_chat: null,
    new_message_alert: [],
    arr_mes: [],
    show_chat: true,
    show_contacts: true,
    authorized: false,
    user_name: null,
    user_img: null
}
const functionalityReducer = (state = initialState, action ) => {
    //console.log(state);
    //console.log(action);
    //console.log('zaushlo - commonReducer');
    //alert('state functionalityReducer');
    //alert(state.user_name);
    switch (action.type) {
        case ADD_MESSAGE_ALERT:
            // if(state.new_message_alert.find(item => item === id)){
            //
            // }
            return {
                ...state,
                new_message_alert: state.new_message_alert.concat(state.arr_mes[0].id)
            }
        case DELETE_ID_NEW_MESSAGE:
            const newArr = [...state.new_message_alert];
            const index = newArr.indexOf(action.payload);
            console.log(index);
            if (index > -1) {
                newArr.splice(index, 1);
            }
            console.log(newArr);
            return { ...state, new_message_alert: newArr}
        case ACTIVE_CHAT:
            return {...state, active_chat: action.payload}
        case ADD_MESSAGE_OBJ:
            return {
                ...state,
                arr_mes: state.arr_mes.concat(action.payload)
            }
        case DELETE_MESSAGE_OBJ:
            return {
                ...state,
                arr_mes: state.arr_mes.slice(1, state.arr_mes.length)
            }
        case CHANGE_SHOW_CONTACTS:
            return {...state, show_contacts: action.payload}
        case CHANGE_SHOW_CHAT:
            return {...state, show_chat: action.payload}
        case CHANGE_AUTHORIZED:
            return {...state, authorized: action.payload}
        case CHANGE_USER_DATA:
            return {
                ...state,
                user_name: action.name,
                user_img: action.img
            }
        default:
            return state;
    }
}

export default functionalityReducer;


