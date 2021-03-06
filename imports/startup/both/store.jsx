import React from 'react'
import {createStore, compose, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import reducers from '../../reducers/index.jsx';

export default function configureStore(initialState, history) {

    return createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(
                routerMiddleware(history)
            )
        )
    );
}