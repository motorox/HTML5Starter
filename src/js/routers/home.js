define([
	'jquery', 
	'backbone', 
	'underscore', 
	'views/home/main',
	'views/projects/list',
	'views/users/list',
	'views/todos/list',
	'views/epg/epglist'
	], 
function($, Backbone, _, mainView, projectListView, userListView, todosListView, epgView ){
	var Router = Backbone.Router.extend({
		initialize: function(){
			this.mainView = mainView;
			Backbone.history.start();
			Backbone.emulateHTTP = true;
			Backbone.emulateJSON = true;
		},
		routes: {
			// Define some URL routes
			'projects': 'showProjects',
			'users': 'showUsers',
			'todos': 'showTodos',
			'epg': 'showEpg',
			'': 'home',
			//Default
			'*actions': 'defaultAction'
		},
		'home': function(){
			this.mainView.render();
		},
		'showProjects': function(){
		  // Call render on the module we loaded in via the dependency array
		  // 'views/projects/list'
		  projectListView.render();
		},
		  // As above, call render on our loaded module
		  // 'views/users/list'
		'showUsers': function(){
		  userListView.render();
		},
		'showTodos': function(){
			todosListView.render();
		},
		'showEpg': function(){
			epgView.render();
		},
		'defaultAction': function(actions){
		  // We have no matching route, lets display the home page 
		  console.log(actions);
		  mainView.render(); 
		}
	});
	
	return Router;
});
