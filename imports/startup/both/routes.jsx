import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from '../../components/App.jsx';
import Home from '../../components/Home.jsx';
import Another from '../../components/Another.jsx';

export default routes = (
    <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="another" component={Another}/>
    </Route>
);