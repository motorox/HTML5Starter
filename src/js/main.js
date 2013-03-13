// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
	baseUrl: "js",
	paths: {
		"amplify": 'libs/amplify.min',
		"loader": 'libs/backbone/loader',
		"jQuery": 'libs/jquery/jquery',
		"underscore": 'libs/underscore/underscore-min',
		"backbone": 'libs/backbone/backbone-min',
		"templates": '../templates'
	},
	shim: {
		"amplify": {
			deps: ["jQuery"],
			exports: "Amplify"
		},
		"backbone": {
			deps: ["jQuery", "underscore"],
			exports: "Backbone"
		},
		"underscore": {
			deps: ["jQuery"],
			exports: "_"
		}
	}

});

/*require([

  // Load our app module and pass it to our definition function
  'app',

  // Some plugins have to be loaded in order due to their non AMD compliance
  // Because these scripts are not "modules" they do not pass any values to the definition function below
  'order!libs/jquery/jquery-min',
  'order!libs/underscore/underscore-min',
  'order!libs/backbone/backbone-min'

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});
*/

require(['app'], 
	function(app){
		app.initialize();
		console.log('Ura!');
});
