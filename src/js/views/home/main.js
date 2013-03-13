// Filename: views/home/main
define([
		'jquery', 
		'backbone',
		'underscore',
		'amplify',
		'models/model',
		'libs/text!templates/home/main.html'], 
function($, Backbone, _, amplify, model, template){
	var View = Backbone.View.extend({
		el: '#page',
		initialize: function(){
			this.model = new model({
				message: 'Hello World'
			});
			this.template = _.template( template, { model: this.model.toJSON() } );
		},
		render: function(){
			$(this.el).html( this.template );
		}
	});
	
	return new View();
});
