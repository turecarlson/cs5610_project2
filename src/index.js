import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/Reducer';
import './index.css';

const store = createStore(reducer, {});
ReactDom.render(    
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);