import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import appReducer from './src/components/uiManager/UIManagerReducer.js'
import App from './src/components/App.jsx'

let store = createStore(appReducer, applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
));

render(
    <App store={store} />,
    document.getElementById('appRoot')
);