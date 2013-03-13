define("backbone-loader", [
	"libs/order!libs/jquery-1.7",
	"libs/order!libs/underscore",
	"libs/order!libs/backbone",
	"libs/order!libs/backbone.localStorage"
], function() {
	return { _: _.noConflict(), Backbone: Backbone.noConflict() };
});

define("underscore", ["backbone-loader"], function(Loader) {
	return Loader._;
});

define("backbone", ["backbone-loader"], function(Loader) {
	return Loader.Backbone;
});

define([
  'jquery',
  'underscore',
  'backbone',
  'models/todo'
], function($, _, Backbone, Todo){

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo,

    // Save all of the todo items under the `"todos-backbone"` namespace.
    localStorage: new Backbone.LocalStorage("todos-backbone"),

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
      return todo.get('order');
    }

  });

  return new TodoList;
});
