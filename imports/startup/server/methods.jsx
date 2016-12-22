import {Items} from '../../collection/both/collections.jsx';

Meteor.methods({

    addOne() {
        this.unblock();
		return Items.insert({title: `test ${Math.round(Math.random() * 100)}`});
	},

    remove(id) {
        this.unblock();
        return Items.remove(id);
    },

});