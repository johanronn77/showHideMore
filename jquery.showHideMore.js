/*
 * jQuery showHideMore plug-in 1.0.0
 *
 * https://github.com/johanronn77/showHideMore/
 *
 * Copyright (c) 2012 Johan Rönn
 *
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function ( $, window, document, undefined ) {		
		var pluginName = "showHideMore",
				defaults = {
				maxHeight: 200,
				class: "showHideMore",
				moretext: "show more",
				lesstext: "show less",
				moretextclass:"showHideMore_moretext",
				lesstextclass:"showHideMore_lesstext",
				animationspeed:500				
		};
		
		function Plugin ( element, options ) {
				this.element = element;
				this.$element = $(element);
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		Plugin.prototype = {
				init: function () {						
						var that = this;						
						
						this.$container = $("<div></div>");
						this.$container.addClass(this.settings.class);
						
																	
						this.$container = this.$element.wrap(this.$container).parent();
						this.$container.append('<br clear="all" />');
						this.defaultHeight = this.$container.height();	
						if(this.defaultHeight<=this.settings.maxHeight)	{
							return;	
						}
						this.status = 0;
						this.$overlay = $("<div></div>");
						this.$overlay.addClass(this.settings.class+'_overlay');
						this.$container.append(this.$overlay);
						this.$showHideButton = $("<a></a>");
						this.$showHideButton.addClass(this.settings.class+'_showhidebutton').html(this.settings.moretext);						
						this.$container.after(this.$showHideButton);
						
						this.$container.css({
							'height':this.settings.maxHeight,
							'overflow':'hidden',
							'position':'relative'							
						});	
						
						this.$showHideButton.bind('click',function(e){
							e.preventDefault();
							that.showhide();
						});
						this.$overlay.bind('click',function(e){
							e.preventDefault();
							that.showhide();
						});
						
						
						
				},
				showhide: function(){
					var that = this;
					if(this.status==0){
						this.$container.animate({
							'height':this.defaultHeight
						},this.settings.animationspeed,function(){
							that.$overlay.hide();
						});
						this.$showHideButton.html(this.settings.lesstext).addClass(this.settings.lesstextclass).removeClass(this.settings.moretextclass);
						this.status=1;
					}else{
						this.$overlay.show();	
						this.$container.animate({
							'height':this.settings.maxHeight
						},this.settings.animationspeed,function(){
							//Do nothing
						});
						this.status=0;
						this.$showHideButton.html(this.settings.moretext).removeClass(this.settings.lesstextclass).addClass(this.settings.moretextclass);
					}	
				}
		};		
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );