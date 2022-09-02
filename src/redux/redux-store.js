import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import appReducer from "./reducers/appReducer";
import functionalityReducer from "./reducers/functionalityReducer";
import createSagaMiddleware from 'redux-saga';
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
    )
);

store.subscribe(() => {
    localStorage.setItem('data', JSON.stringify(store.getState().appState));
});
sagaMiddleware.run(messageWatcher);

export default store;