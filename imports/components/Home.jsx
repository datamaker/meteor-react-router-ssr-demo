import React from 'react';
import {Link} from 'react-router';
import {ReactMeteorData} from 'react-meteor-data';
import {Items} from '../collection/both/collections.jsx';

export default Home = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            items: Items.find().fetch()
        };
    },

    getInitialState() {
        return {};
    },

    _addOne() {
        Meteor.call('addOne', `test ${Math.round(Math.random() * 100)}`);
        console.log('new')
    },

    _remove(idx, ev) {
        Meteor.call('remove', ev.target.id);
        console.log('remove ', ev.target.id, idx);
    },

    render() {
        return <div>
            Go to: <Link to="/another">another page</Link>

            {
                this.data.items.map((item, idx) => {
                    return <h4 key={item._id} id={item._id} onClick={this._remove.bind(this, idx)}>{item.title}</h4>
                })
            }

            <p>
                <button onClick={this._addOne}>Add One</button>
            </p>

        </div>
    }
});