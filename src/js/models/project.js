define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var project = Backbone.Model.extend({
    defaults: {
      score: 10
    },
    initialize: function(){
    }

  });
  return project;

});
