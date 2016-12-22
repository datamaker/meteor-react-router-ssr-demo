import {Items} from '../../collection/both/collections.jsx';
import './methods.jsx';

Meteor.publish('items', function() {
    let cursor = Items.find({}, {});
    // simulate latency to show optimistic UI
    Meteor._sleepForMs(2000);
    return cursor;
});

Meteor.startup(() => {
    if (Items.find().count() === 0) {
        Items.insert({title: "test 1"});
        Items.insert({title: "test 2"});
        Items.insert({title: "test 3"});
    }
});