import * as axios from "axios";
import store from '../redux-store';


const objTextId = (mes) => {
    const active_chat = store.getState().functionalityReducer.active_chat;
    return {text: mes, id: active_chat};
}
export async function GetMessage() {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return objTextId(response.data.value);
}