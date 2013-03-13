// http://172.27.136.16/MiTV_SP2/overview.do?type=tv&startDateTime=2012-11-27T21:00:00&endDateTime=2012-11-28T20:59:59
//http://epg-ds2.antw-solution-lab.net:10011/MiTV_IPTCDemo21/overview.do?type=tv&startDateTime=2012-12-04T21:00:00&endDateTime=2012-12-05T20:59:59

define("backbone-loader", ["libs/order!libs/jquery-1.7", "libs/order!libs/underscore", "libs/order!libs/backbone", "libs/order!libs/backbone.localStorage"], function() {
	return {
		_ : _.noConflict(),
		Backbone : Backbone.noConflict()
	};
});

define("underscore", ["backbone-loader"], function(Loader) {
	return Loader._;
});

define("backbone", ["backbone-loader"], function(Loader) {
	return Loader.Backbone;
});

define(['jquery', 'underscore', 'backbone', 'models/program'], function($, _, Backbone, program) {

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var epg = Backbone.Collection.extend({

		// Reference to this collection's model.
		model : program,
		url: "http://epg-ds2.antw-solution-lab.net:10011/MiTV_IPTCDemo21/overview.do?type=tv&startDateTime=2012-12-04T21:00:00&endDateTime=2012-12-05T20:59:59",
		parse: function(resp, xhr) {
        	return resp.Channel;
    	}
	});

	return new epg;
});

/*
var Mailbox = Backbone.Model.extend({

	initialize : function() {
		this.messages = new Messages;
		this.messages.url = '/mailbox/' + this.id + '/messages';
		this.messages.on("reset", this.updateCounts);
	},
});

var Inbox = new Mailbox;

// And then, when the Inbox is opened:

Inbox.messages.fetch();
*/
 