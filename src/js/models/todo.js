define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  // Todo Model
  // ----------

  // Our basic **Todo** model has `content`, `order`, and `done` attributes.
  var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
      	title: "no title",
        content: "empty todo...",
        //order: Todos.nextOrder(),
        done: false
      };
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    },

    // Remove this Todo from *localStorage* and delete its view.
    clear: function() {
      this.destroy();
      this.view.remove();
    }
  });
  return Todo;
});