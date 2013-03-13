define([
  'jquery',
  'underscore',
  'backbone',
  'models/program'
], function($, _, Backbone, program){
  var programs = Backbone.Collection.extend({
    model: program,
    initialize: function(){
    }

  });

  return new programs;
});
