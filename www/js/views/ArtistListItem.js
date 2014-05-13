define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/ArtistListItem.html", 
     "dojo/dom-style"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, domStyle){

     return declare("AlbumListItem", [_WidgetBase, _TemplatedMixin], {

        templateString: template,

        delegate: [],

        artistName : "", 

        artistId : 54, 

        startup : function() {
            this.inherited(arguments);
        },

         postCreate : function(){
            
         }, 

         _handleDetailClick : function(evt){
            params = {
                artistId : this.artistId
            };
            this.delegate._handleArtistClick(params);
         }

     });
 });