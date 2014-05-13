define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/TrackListItem.html", 
     "dojo/dom-style"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, domStyle){

     return declare("TrackListItem", [_WidgetBase, _TemplatedMixin], {

        templateString: template,

        trackName : "",

        trackLength : "",

        trackNum : "",

        startup : function() {
            this.inherited(arguments);
        },

         postCreate : function(){
            
         }
     });
 });