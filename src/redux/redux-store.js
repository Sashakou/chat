import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import appReducer from "./reducers/appReducer";
import functionalityReducer from "./reducers/functionalityReducer";
import createSagaMiddleware from 'redux-saga';
//import {usersWatcher} from "./saga/usersSaga";
import {messageWatcher} from "./saga/messageSaga";
import logger from 'redux-logger'
const sagaMiddleware = createSagaMiddleware();
const reducers = {
    appState: appReducer,
    functionalityReducer
}
const reducer = combineReducers(reducers);
const store = createStore(
    reducer,
    compose(
        //applyMiddleware(sagaMiddleware)
        applyMiddleware(sagaMiddleware, logger),
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// function* rootWatcher() {
//     yeild all([sagaWatcher(), sagaWatcher2()])
// }
// sagaMiddleware.run(rootWatcher);

store.subscribe(() => {
    localStorage.setItem('data', JSON.stringify(store.getState().appState));
});
sagaMiddleware.run(messageWatcher);
//console.log(store.getState());

export default store;