import React from 'react';
import ReactHelmet from 'react-helmet';

export default App = React.createClass({

    getInitialState() {
        Meteor.subscribe("items", () => {
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
                    //onChangeClientState={(newState) => console.log(newState)}
                />
                <header>Pub/Sub { (this.state.isReady) ? "(..sub ready, live data now!)" : null }</header>

                {this.props.children}

                <footer>Footer</footer>
            </div>
        );
    }
});