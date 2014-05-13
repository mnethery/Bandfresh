define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/AlbumListItem.html", 
     "dojo/dom-style"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, domStyle){

     return declare("AlbumListItem", [_WidgetBase, _TemplatedMixin], {

        templateString: template,

        delegate : [],

        albumName : "", 

        albumId : 15,

        bandName : "", 

        releaseDate :  "", 

        startup : function() {
            this.inherited(arguments);
        },

         postCreate : function(){
            
         },

         _handleDetailClick : function(evt){
            var params = {
                albumId : this.albumId
            };
            this.delegate._handleDetailClick(params);
         }

     });
 });