define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/Settings.html", 
     "dojo/dom-style"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, domStyle){

     return declare("SettingsController", [_WidgetBase, _TemplatedMixin], {

        templateString: template,

        startup : function() {
            this.inherited(arguments);
        },

         postCreate : function(){

            domStyle.set(this.domNode, {
                height: window.innerHeight - 20 + 'px'
            });
            
         }

     });
 });