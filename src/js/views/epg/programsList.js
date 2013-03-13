define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above
  'collections/epg'

], function($, _, Backbone, epgCollection){
	var ItemView = Backbone.View.extend({
		tagName: 'li',
		
		events: {
			'click span.swap': 'swap',
			'click span.delete': 'remove'
		},
		
		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'swap', 'remove');
			console.log("Model in programsList view:")
			console.log(this.model);
			//this.listenTo(this.model, "change", this.render);
			// this.model.bind('change', this.render);
			// this.model.bind('remove', this.unrender);
		},
		
		render: function(){
			var self = this;
			
			$(this.el).html('<span style="color:black;">' + this.model.get('ChannelId') + '</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');

			_(this.model.get('Program')).each(function(item) {
				self.appendItem(item);
			}, this);

			return this;
		},
		appendItem : function(item) {
			console.log(item);
			//var itemView = new ItemView({model : item});
			//$('ul', this.el).append(itemView.render().el);
			$(this.el).append("<div><div>" + item.Title + "</div><div>" + item.Duration + "</div><div>" + item.ShortDescription + "</div></div>");
		},
		
		unrender: function(){
			$(this.el).remove();
		},
		
		swap: function(){
			var swapped = {
				part1: this.model.get('part2'),
				part2: this.model.get('part1')
			};
			this.model.set(swapped);
		},
		
		remove: function(){
			this.model.destroy();
		}
	});
  return ItemView;
});
