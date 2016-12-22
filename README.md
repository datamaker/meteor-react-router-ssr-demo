# meteor-react-router-ssr-demo
meteor 1.4 + react + react-router + react-router-ssr + redux를 활용한
Universal Rendering 데모 입니다. 

참고는 react-router-ssr에 있는 예제를 참고하였습니다. 

## Install

```javascript
meteor npm install
meteor
```

## Example with Redux
https://github.com/thereactivestack-legacy/meteor-react-router-ssr#example-with-redux

ReactRouterSSR supports applications that use Redux, using the `rehydrateHook` and `dehydrateHook` options in clientOptions and serverOptions respectively.

```javascript
import React from 'react';
import { Provider } from 'react-redux';

import routes from './routes';
import configureStore from './store';

// Data that is populated by hooks during startup
let history;
let store;
let initialState;

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
}

const clientOptions = { historyHook, rehydrateHook, wrapperHook };
const serverOptions = { historyHook, dehydrateHook };

ReactRouterSSR.Run(routes, clientOptions, serverOptions);
```