// This set's up the module paths for underscore and backbone
require.config({ 
    'paths': {
    	"json2": "libs/json2",
    	"amplify": "libs/amplify.min",
		"underscore": "libs/underscore-min", 
		"backbone": "libs/backbone-min",
		"backbone-localstorage": "libs/backbone.localstorage"
	},
	'shim': 
	{
		amplify: {
			'exports': 'amplify'
		},
		backbone: {
			'deps': ['jquery', 'underscore'],
			'exports': 'Backbone'
		},
		underscore: {
			'exports': '_'
		}
	}	
}); 

require([
	'underscore',
	'backbone',
	'app'
	], 
	function(_, Backbone, app){
		app.init();
});
