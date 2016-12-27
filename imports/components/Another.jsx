import React from 'react';
import {Link} from 'react-router';
import {InjectData} from 'meteor/meteorhacks:inject-data';
import {connect} from 'react-redux';

let Another = React.createClass({

    getInitialState() {
        return {
            isReady: false,
            items: [],
        };
    },

    _addOne() {
        Meteor.call('addOne');
        console.log('new')
    },

    _remove(ev) {
        Meteor.call('remove', ev.target.id);
        console.log('remove ' + ev.target.id);
    },

    render() {

        return <div>
            Go to: <Link to="/">Home</Link>|<a href="/">Home (full reload)</a>

            {
                this.props.items.items.map((item) => {
                    return <h4 key={item._id} id={item._id} onClick={this._remove}>{item.title}</h4>
                })
            }

            <p>
                <button onClick={this._addOne}>Add One</button>
            </p>

        </div>
    }

});

let mapStateToProps = ( state ) => {
    return {
        items : state.items
    }
};

export default Another = connect( mapStateToProps )( Another );