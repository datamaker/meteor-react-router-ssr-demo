import React from 'react';

export default Another = React.createClass({

    getInitialState: function () {
        return {};
    },

    render() {
        return <div> Go to: <Link to="/">Home</Link>|<a href="/">Home (full reload)</a></div>
    }

});