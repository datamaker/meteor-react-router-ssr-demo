import React from 'react';
import {Provider} from 'react-redux';
import ReactHelmet from 'react-helmet';
import ReactCookie from 'react-cookie';
import {ReactRouterSSR} from 'meteor/datamaker:react-router-ssr';
import routes from './routes';
import configureStore from './store';
import './methods.jsx';

// Data that is populated by hooks during startup
let history;
let store;
let initialState;
let items;

const props = {
    onUpdate() {
        // Notify the page has been changed to Google Analytics
        ga('send', 'pageview');
    }
};

// Create a react-helmat
const htmlHook = (html) => {
    const head = ReactHelmet.rewind();
    return html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link + head.script + head.noscript);
};

// Create a react-cookie
const preRender = (req, res) => {
    Meteor.call("items", (error, result) => {
        initialState = { items : { items : result } };
    });
    return ReactCookie.plugToRequest(req, res);
};

// Use history hook to get a reference to the history object
const historyHook = newHistory => history = newHistory;

// Pass the state of the store as the object to be dehydrated server side
const dehydrateHook = () => store.getState();

// Take the rehydrated state and use it as the initial state client side
const rehydrateHook = state => initialState = state;

// Create a redux store and pass into the redux Provider wrapper
const wrapperHook = app => {
    store = configureStore(initialState, history);
    return <Provider store={store}>{app}</Provider>;
};

const clientOptions = {props, historyHook, rehydrateHook, wrapperHook};
const serverOptions = {htmlHook, preRender, historyHook, dehydrateHook};

ReactRouterSSR.Run(routes, clientOptions, serverOptions);

if (Meteor.isClient) {
    // Load Google Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-XXXXXXXX-X', 'auto');
}
