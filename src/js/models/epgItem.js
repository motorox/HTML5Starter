define(['underscore', 'backbone'], function(_, Backbone) {

	// Our basic **Todo** model has `content`, `order`, and `done` attributes.
	var epgItem = Backbone.Model.extend({
		
		initialize : function() {
			this.messages = new Messages;
			this.messages.url = '/mailbox/' + this.id + '/messages';
			this.messages.on("reset", this.updateCounts);
		}
	});

	return epgItem;
}); 