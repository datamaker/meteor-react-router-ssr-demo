import {Items} from '../../collection/both/collections.jsx';

Meteor.methods({

    items() {
        this.unblock();
        //Meteor._sleepForMs(2000);
        return Items.find({}).fetch();
    },

    addOne() {
        this.unblock();
        return Items.insert({title: `test ${Math.round(Math.random() * 100)}`});
    },

    remove(id) {
        this.unblock();
        return Items.remove(id);
    },

});