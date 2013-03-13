define(['underscore', 'backbone'], function(_, Backbone) {

	// Our basic program model has `title`, `order`, and `done` attributes.
	var program = Backbone.Model.extend({

		// Default attributes for the todo item.
		defaults : function() {
			// return {
				// Title : "no title",
				// ShortDescription : "empty todo...",
				// PublishedStartTime: "",
				// PublishedEndTime: "",
				// ProgramDetailsURL: "",
				// Duration: "",
				// "@programId" : null
			// };
		},

		initialize : function() {
		}
	});

	return program;
}); 