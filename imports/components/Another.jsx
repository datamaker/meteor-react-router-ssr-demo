import React from 'react';
import {Link} from 'react-router';
import {InjectData} from 'meteor/meteorhacks:inject-data';
import {items} from '../actions/items.jsx';
import {connect} from 'react-redux';

let Another = React.createClass({

    getInitialState() {
        return {
            isReady: false,
            items: [],
        };
    },

    componentWillMount() {

        //console.log('componentWillMount2', new Date().getMilliseconds());

/*        Meteor.call("items", (error, result) => {
            //this.setState({isReady: true, items: result});
            console.log('componentWillMount', new Date().getMilliseconds());
            this.props.dispatch( items( result ) );
        });

        InjectData.getData("dehydrated-initial-data", (data) => {
            console.log('this.props.items.items1', this.props.items.items, new Date().getMilliseconds());
            console.log('dehydrated-initial-data', data);
        });*/

        /*if (Meteor.isClient) {
            InjectData.getData("dehydrated-initial-data", (data) => {
                let result = JSON.parse(data);
                console.log('result', result);
                this.setState({isReady: true, items: result});
            });
        } else {
            Meteor.call("items", (error, result) => {
                this.setState({isReady: true, items: result});
                this.props.dispatch( items( result ) );
            });
        }*/

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

Another = connect( mapStateToProps )( Another );
export default Another;