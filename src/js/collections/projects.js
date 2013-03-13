define([
  'jquery',
  'underscore',
  'backbone',
  'models/project'
], function($, _, Backbone, project){
  var projects = Backbone.Collection.extend({
    model: project,
    initialize: function(){

    }

  });

  return new projects;
});
