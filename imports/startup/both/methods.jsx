import {Items} from '../../collection/both/collections.jsx';

Meteor.methods({

    items() {
        this.unblock();
        //Meteor._sleepForMs(2000);
        return Items.find({}).fetch();
    },

    addOne(contents) {
        this.unblock();
        return Items.insert({title: contents});
    },

    remove(id) {
        this.unblock();
        return Items.remove(id);
    },

});