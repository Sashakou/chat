import store from '../redux-store';
//console.log('store');
//console.log(store);
//console.log(store.getState().appState.chats);
export const newMessageID = () => {
    //console.log(store.getState().appState.new_message_alert);
    return store.getState().appState.new_message_alert;
}