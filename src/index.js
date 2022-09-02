import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
//console.log(store.getState());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
reportWebVitals();
