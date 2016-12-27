import React from 'react';
import {Link} from 'react-router';
import {InjectData} from 'meteor/meteorhacks:inject-data';
import {
    memoPostRequest,
    memoListRequest,
    memoEditRequest,
    memoRemoveRequest,
    memoStarRequest
} from '../actions/items.jsx';
import {connect} from 'react-redux';
import Write from './Write';

let Another = React.createClass({

    getInitialState() {
        return {
            isReady: false,
            items: [],
        };
    },

    _addOne() {
        let ran = `test ${Math.round(Math.random() * 100)}`;
        this.props.memoPostRequest(ran);
    },

    _remove(idx, ev) {
        this.props.memoRemoveRequest(ev.target.id, idx);
    },

    render() {
        console.log('this.props', this.props)

        return <div>
            Go to: <Link to="/">Home</Link>|<a href="/">Home (full reload)</a>

            {
                this.props.items.list.data.map((item, idx) => {
                    return <h4 key={item._id} id={item._id} onClick={this._remove.bind(this, idx)}>{item.title}</h4>
                })
            }

            {/*<Write onPost={this._addOne}/>*/}
            <p>
                <button onClick={this._addOne}>Add One</button>
            </p>

        </div>
    }

});

Another.PropTypes = {
    username: React.PropTypes.string
};

Another.defaultProps = {
    username: undefined
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post,
        currentUser: state.authentication.status.currentUser,
        memoData: state.memo.list.data,
        listStatus: state.memo.list.status,
        isLast: state.memo.list.isLast,
        editStatus: state.memo.edit,
        removeStatus: state.memo.remove,
        starStatus: state.memo.star
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        },
        memoListRequest: (isInitial, listType, id, username) => {
            return dispatch(memoListRequest(isInitial, listType, id, username));
        },
        memoEditRequest: (id, index, contents) => {
            return dispatch(memoEditRequest(id, index, contents));
        },
        memoRemoveRequest: (id, index) => {
            return dispatch(memoRemoveRequest(id, index));
        },
        memoStarRequest: (id, index) => {
            return dispatch(memoStarRequest(id, index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Another);