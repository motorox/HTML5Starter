// Filename: views/epg/epglistlist
define(['jquery', 'underscore', 'backbone',
// Pull in the Collection module from above
'collections/epg', 'views/epg/programsList', 'libs/text!templates/projects/list.html'], 
function($, _, Backbone, epgCollection, ItemView, projectListTemplate) {
	var projectListView = Backbone.View.extend({
		el : $("#page"),
		initialize : function() {
			this.collection = epgCollection;
			this.collection.fetch({
				dataType : "jsonp"
			});
		},
		exampleBind : function(model) {
			//console.log(model);
		},
		render : function() {
			var self = this;
			var data = {
				projects : this.collection.models,
				_ : _
			};
			console.log(this.collection.models);
			var compiledTemplate = _.template(projectListTemplate, data);
			$(this.el).html(compiledTemplate);
			_(this.collection.models).each(function(item) {// in case collection is not empty
				self.appendItem(item);
			}, this);
		},
		appendItem : function(item) {
			console.log(item.get("Program"));
console.log(ItemView);
			var itemView = new ItemView({model : item});
			$('ul', this.el).append(itemView.render().el);

		}
	});
	return new projectListView;
});
