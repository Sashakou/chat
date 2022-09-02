import {takeEvery, put, call} from 'redux-saga/effects'
import {
    AddMessageContactCreator, AddMessageUserCreator,
    AddNewMessageAlert, AddNewMessageArr, DeleteNewMessageArrCreator,
    GetUsersCreator,
    hideLoader,
    LoaderCreator,
    showAlert,
    showLoader, SortContactsCreator, AlertCreator
} from '../actions'
import {GetMessage} from "../API/ChucknorrisAPI";
import {REQUEST_MESSAGE} from "../actionsTypes";
import store from '../redux-store';

export function* messageWatcher() {
    yield takeEvery(REQUEST_MESSAGE, messageWorker);
}
const sortCont = () => {
    let contacts = store.getState().appState.contacts;
    let copyContacts = JSON.parse(JSON.stringify(contacts));
    let arr_mesId = store.getState().functionalityReducer.arr_mes[0].id;
    let objCont = copyContacts.find(item => item.id === arr_mesId);
    const index = copyContacts.findIndex(item => item.id === arr_mesId);
    if (index > -1) {
        copyContacts.splice(index, 1);
    }
    copyContacts.unshift(objCont);
    return copyContacts;
}
const delay = ms => {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), ms));
}

function* messageWorker() {
    try {
        const payload = yield call(GetMessage);
        yield put(AddNewMessageArr(payload));
        yield call(delay, 10000);
        yield put(AddMessageContactCreator(store.getState().functionalityReducer.arr_mes[0].text, store.getState().functionalityReducer.arr_mes[0].id));
        yield put(AddNewMessageAlert()); // Сповіщення про повідомлення
        yield put(SortContactsCreator(sortCont())); // Переміщення вверх списку
        yield put(DeleteNewMessageArrCreator()); // видалення тимчасових даних про нові повідомлення

    } catch (e) {
        yield put(AlertCreator('Something went wrong, try again'));
        yield call(delay, 3000);
        yield put(AlertCreator(null));
    }
}
