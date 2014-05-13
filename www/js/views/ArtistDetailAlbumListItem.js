define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/ArtistDetailAlbumListItem.html", 
     "dojo/dom-style"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, domStyle){

     return declare("ArtistDetailAlbumListItem", [_WidgetBase, _TemplatedMixin], {

        templateString: template,

        delegate : [],

        albumName : "", 

        releaseDate : "",

        startup : function() {
            this.inherited(arguments);
        },

         postCreate : function(){
            
         },

         _handleDetailClick : function(evt){
            var params = {
                albumId : this.albumId
            };
            this.delegate._handleAlbumClick(params);
         }

     });
 });