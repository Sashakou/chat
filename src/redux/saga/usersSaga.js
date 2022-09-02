import {takeEvery, put, call} from 'redux-saga/effects'
import {GetUsersCreator, hideLoader, LoaderCreator, showAlert, showLoader} from '../actions'
import {GetUsers} from "../API/UserAPI";
import {USERS, REQUEST_USERS} from "../actionsTypes";
//console.log(GetUsers());
console.log(REQUEST_USERS);
export function* usersWatcher() {
    yield takeEvery(REQUEST_USERS, usersWorker);
}

function* usersWorker() {
    console.log('зайшло');
    try {
        yield put(LoaderCreator(true))
        const payload = yield call(GetUsers);
        console.log(payload);
        yield put(GetUsersCreator(payload))
        LoaderCreator(false);
    } catch (e) {
        console.log('Нето щось');
        //yield put(showAlert('Что-то пошло не так'))
    } finally {
        console.log('finally зайшло');
        yield put(LoaderCreator(false));
    }
}
