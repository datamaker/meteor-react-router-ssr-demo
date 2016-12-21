import React from 'react';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Link } from 'react-router';
import { ReactRouterSSR } from 'meteor/datamaker:react-router-ssr';
import { ReactMeteorData } from 'react-meteor-data';
import { configureStore } from './store';
import ReactMixin from 'react-mixin';
import ReactHelmet from 'react-helmet';
import ReactCookie from 'react-cookie';

/// Collections
Items = new Mongo.Collection('items');

/// Components
let App = React.createClass({

    getInitialState() {
        ItemsSub = Meteor.subscribe("items", () => {
            this.setState({isReady: true});
        });

        return {
            isReady: false,
        };
    },

    render() {
        return (
            <div>
                <header>Header { (this.state.isReady) ? "(..sub ready, live data now!)" : null }</header>

                {this.props.children}

                <footer>Footer</footer>
            </div>
        );
    }
});

class Another extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div> Go to: <Link to="/">Home</Link>|<a href="/">Home (full reload)</a></div>
    }
}

let Home = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            items: Items.find().fetch()
        };
    },

    getInitialState: function() {
        return {};
    },

    _addOne() {
        Items.insert({title: `test ${Math.round(Math.random()*100)}`})
        console.log('new')
    },

    _remove(ev) {
        Items.remove(ev.target.id)
        console.log('remove '+ev.target.id)
    },

    render() {
        return <div>
            Go to: <Link to="/another">another page</Link>

            {
                this.data.items.map((item) => {
                    return <h4 key={item._id} id={item._id} onClick={this._remove} >{item.title}</h4>
                })
            }

            <p>
                <button onClick={this._addOne}>Add One</button>
            </p>

        </div>
    }
});

/// Isomorphic Router

let routes = (
    <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="another" component={Another} />
    </Route>
);

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
};

const clientOptions = { historyHook, rehydrateHook, wrapperHook };
const serverOptions = { historyHook, dehydrateHook };

ReactRouterSSR.Run(routes, clientOptions, serverOptions);


