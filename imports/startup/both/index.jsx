import React from 'react';
import {Provider} from 'react-redux';
import {IndexRoute, Route, Link} from 'react-router';
import {ReactRouterSSR} from 'meteor/datamaker:react-router-ssr';
import {ReactMeteorData} from 'react-meteor-data';
import {configureStore} from './store';
import ReactHelmet from 'react-helmet';
import ReactCookie from 'react-cookie';
import ReactMixin from 'react-mixin';

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
                <ReactHelmet
                    htmlAttributes={{"lang": "ko"}}
                    title={ "" }
                    titleTemplate="%s | meteor-router-ssr-demo"
                    defaultTitle="meteor-router-ssr-demo"
                    meta={[
                        {charset: "utf-8"},
                        {name: "viewport", content: "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"},
                        {name: "theme-color", content: "#ffffff"},
                        {name: "msapplication-TileColor", content: "#ffffff"},
                        {name: "msapplication-TileImage", content: "https://dummyimage.com/114x114/000/fff"},
                        {name: "keywords", content: "react, redux, react-router-ssr, ssr"},
                        {name: "description", content: "Meteor 1.4 Universal Rendering Demo"},
                        {property: "og:site_name", content: "meteor-router-ssr-demo"},
                        {property: "og:title", content: "Meteor 1.4 Universal Rendering Demo"},
                        {property: "og:type", content: "article"},
                        {property: "og:url", content: process.env.ROOT_URL},
                        {property: "og:image", content: "https://dummyimage.com/600x400/000/fff&text=datamaker/meteor-router-ssr-demo"},
                        {property: "og:description", content: "Meteor 1.4 Universal Rendering Demo"},
                    ]}
                    link={[
                        {rel: "apple-touch-icon", sizes: "57x57", href: "https://dummyimage.com/57x57/000/fff"},
                        {rel: "apple-touch-icon", sizes: "60x60", href: "https://dummyimage.com/60x60/000/fff"},
                        {rel: "apple-touch-icon", sizes: "72x72", href: "https://dummyimage.com/72x72/000/fff"},
                        {rel: "apple-touch-icon", sizes: "76x76", href: "https://dummyimage.com/76x76/000/fff"},
                        {rel: "apple-touch-icon", sizes: "114x114", href: "https://dummyimage.com/114x114/000/fff"},
                        {rel: "apple-touch-icon", sizes: "120x120", href: "https://dummyimage.com/120x120/000/fff"},
                        {rel: "apple-touch-icon", sizes: "144x144", href: "https://dummyimage.com/144x144/000/fff"},
                        {rel: "apple-touch-icon", sizes: "152x152", href: "https://dummyimage.com/152x152/000/fff"},
                        {rel: "apple-touch-icon", sizes: "180x180", href: "https://dummyimage.com/180x180/000/fff"},
                        {rel: "icon", type: "image/png", sizes: "192x192", href: "https://dummyimage.com/192x192/000/fff"},
                        {rel: "icon", type: "image/png", sizes: "32x32", href: "https://dummyimage.com/32x32/000/fff"},
                        {rel: "icon", type: "image/png", sizes: "96x96", href: "https://dummyimage.com/96x96/000/fff"},
                        {rel: "icon", type: "image/png", sizes: "16x16", href: "https://dummyimage.com/16x16/000/fff"},
                    ]}
                    script={[
                        {"src": "https://maps.googleapis.com/maps/api/js?key=xxxxxxxxxxxxxxxxx&libraries=places&region=KR", "type": "text/javascript"},
                    ]}
                    noscript={[
                        {"innerHTML": `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1111111&ev=PageView&noscript=1"/>`}
                    ]}
                    onChangeClientState={(newState) => console.log(newState)}
                />
                <header>Header { (this.state.isReady) ? "(..sub ready, live data now!)" : null }</header>

                {this.props.children}

                <footer>Footer</footer>
            </div>
        );
    }
});

let Another = React.createClass({

    getInitialState: function () {
        return {};
    },

    render() {
        return <div> Go to: <Link to="/">Home</Link>|<a href="/">Home (full reload)</a></div>
    }

});

let Home = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            items: Items.find().fetch()
        };
    },

    getInitialState: function () {
        return {};
    },

    _addOne() {
        Items.insert({title: `test ${Math.round(Math.random() * 100)}`});
        console.log('new')
    },

    _remove(ev) {
        Items.remove(ev.target.id);
        console.log('remove ' + ev.target.id);
    },

    render() {
        return <div>
            Go to: <Link to="/another">another page</Link>

            {
                this.data.items.map((item) => {
                    return <h4 key={item._id} id={item._id} onClick={this._remove}>{item.title}</h4>
                })
            }

            <p>
                <button onClick={this._addOne}>Add One</button>
            </p>

        </div>
    }
});

/// Universal Rendering
let routes = (
    <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="another" component={Another}/>
    </Route>
);

// Data that is populated by hooks during startup
let history;
let store;
let initialState;

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
