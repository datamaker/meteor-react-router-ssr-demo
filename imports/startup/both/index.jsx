import React from 'react';
import { IndexRoute, Route, Link } from 'react-router';
import { ReactRouterSSR } from 'meteor/datamaker:react-router-ssr';
import { ReactMeteorData } from 'react-meteor-data';
import ReactMixin from 'react-mixin';
import ReactHelmet from 'react-helmet';
import ReactCookie from 'react-cookie';

/// Collections
Items = new Mongo.Collection('items');

/// Components
App = React.createClass({

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

Home = React.createClass({

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

            <p>
                <button onClick={this._addOne}>Add One</button>
            </p>

        </div>
    }
});

/// Isomorphic Router


Meteor.startup( function() {
    AppRoutes = (
            <Route component={App}>
            <Route path="/" component={Home} />
            <Route path="another" component={Another} />
        </Route>
    );

    ReactRouterSSR.Run(AppRoutes);
});