define(
	['jquery', 'backbone', 'underscore', 'amplify', 'models/todo', 'libs/text!templates/todos/item.html'], 

function($, Backbone, _, amplify, model, template) {
	// The DOM element for a todo item...
	var TodoView = Backbone.View.extend({
		// el: '#page',
		// initialize: function(){
		// this.model = new model({
		// message: 'Hello World'
		// });
		// this.template = _.template( template, { model: this.model.toJSON() } );
		// },
		// render: function(){
		// $(this.el).html( this.template );
		// },
		//... is a list tag.
		tagName : "li",

		// The DOM events specific to an item.
		events : {
			"click .toggle" : "toggleDone",
			"dblclick .view" : "edit",
			"click a.destroy" : "clear",
			"keypress .edit" : "updateOnEnter",
			"blur .edit" : "close"
		},

		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
		initialize : function() {
			this.model = new model();
			this.template = _.template(template);
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},

		// Re-render the titles of the todo item.
		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('done', this.model.get('done'));
			this.input = this.$('.edit');
			return this;
		},
		
		remove: function(){},

		// Toggle the `"done"` state of the model.
		toggleDone : function() {
			this.model.toggle();
		},

		// Switch this view into `"editing"` mode, displaying the input field.
		edit : function() {
			this.$el.addClass("editing");
			this.input.focus();
		},

		// Close the `"editing"` mode, saving changes to the todo.
		close : function() {
			var value = this.input.val();
			if (!value) {
				this.clear();
			} else {
				this.model.save({
					title : value
				});
				this.$el.removeClass("editing");
			}
		},

		// If you hit `enter`, we're through editing the item.
		updateOnEnter : function(e) {
			if (e.keyCode == 13)
				this.close();
		},

		// Remove the item, destroy the model.
		clear : function() {
			this.model.destroy();
		}
	});

	return new TodoView();
});
