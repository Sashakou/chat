import * as axios from "axios";
import store from '../redux-store';

// const objStateNew = (mes) => {
//     let dateLocal = new Date();
//     const chats = store.getState().appState.chats;
//     const active_chat = store.getState().functionalityReducer.active_chat;
//     let chatsCopy = JSON.parse(JSON.stringify(chats));
//     let ntwMes = {
//         value: mes,
//         is_contact_value: true,
//         date: `${dateLocal.getFullYear()}-${("0" + (dateLocal.getMonth() + 1)).slice(-2)}-${dateLocal.getDate()} ${dateLocal.getHours()}:${dateLocal.getMinutes()}:${dateLocal.getSeconds()}.${dateLocal.getMilliseconds()}`
//     }
//     chatsCopy.find(item => item.id === active_chat ).chat.push(ntwMes);
//     return {chats: chatsCopy, id: active_chat};
// }
const objTextId = (mes) => {
    const active_chat = store.getState().functionalityReducer.active_chat;
    return {text: mes, id: active_chat};
}
export async function GetMessage() {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return objTextId(response.data.value);
}