// Filename: views/todos/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above
  'collections/todolist',
  'libs/text!templates/todos/main.html',
	'views/todos/item'
], function($, _, Backbone, todosCollection, todosListTemplate, todoView){
	var todosListView = Backbone.View.extend({

	    // Instead of generating a new element, bind to the existing skeleton of
	    // the App already present in the HTML.
	    el: $("#page"),
	
	    // Delegated events for creating new items, and clearing completed ones.
	    events: {
	      "keypress #new-todo":  "createOnEnter",
	      "click #clear-completed": "clearCompleted",
	      "click #toggle-all": "toggleAllComplete",
	      "keyup #new-todo":     "showTooltip",
    	  "click .todo-clear a": "clearCompleted"
	    },
    // At initialization we bind to the relevant events on the `todosCollection`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
	    initialize: function(){
	    	_.bindAll(this, 'addOne', 'addAll', 'render');
	    	this.statsTemplate = _.template(todosListTemplate);
			console.log(todosCollection);
			this.input = this.$("#new-todo");
			this.allCheckbox = this.$("#toggle-all");

			todosCollection.on('add', this.addOne, this);
			todosCollection.on('reset', this.addAll, this);
			todosCollection.on('all', this.render, this);
			
			this.footer = this.$('footer');
			this.main = $('#main');
			
			todosCollection.fetch();
	    },
	    
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      this.$('#todo-stats').html(this.statsTemplate({
        total:      todosCollection.length,
        done:       todosCollection.done().length,
        remaining:  todosCollection.remaining().length
      }));
      var done = todosCollection.done().length;
      var remaining = todosCollection.remaining().length;

      if (todosCollection.length) {
        this.main.show();
        this.footer.show();
        this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
      } else {
        this.main.hide();
        this.footer.hide();
      }

		console.log(this.allCheckbox);
		this.allCheckbox.checked = !remaining;
		$(this.el).html( this.statsTemplate );
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
    	console.log(todoView);
		//var itemView = new todoView({model: todo});
		this.$("#todo-list").append(todoView.render().el);
    },

    // Add all items in the **todosCollection** collection at once.
    addAll: function() {
      todosCollection.each(this.addOne);
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.invoke(todosCollection.done(), 'destroy');
      return false;
    },

    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        content: this.input.val(),
        order:   todosCollection.nextOrder(),
        done:    false
      };
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      todosCollection.create(this.newAttributes());
      this.input.val('');
    },

    // // Clear all done todo items, destroying their models.
    // clearCompleted: function() {
      // _.each(Todos.done(), function(todo){ todo.clear(); });
      // return false;
    // },

    // Lazily show the tooltip that tells you to press `enter` to save
    // a new todo item, after one second.
    showTooltip: function(e) {
      var tooltip = this.$(".ui-tooltip-top");
      var val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val == '' || val == this.input.attr('placeholder')) return;
      var show = function(){ tooltip.show().fadeIn(); };
      this.tooltipTimeout = _.delay(show, 1000);
    },
    
	toggleAllComplete: function () {
		var done = this.allCheckbox.checked;
		todosCollection.each(function (todo) { todo.save({'done': done}); });
	}

	});
	
	return new todosListView;
});