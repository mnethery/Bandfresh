define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/FriendListItem.html", 
     "dojo/dom-style"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, domStyle){

     return declare("FriendListItem", [_WidgetBase, _TemplatedMixin], {

        templateString: template,

        friendName : "", 

        delegate: [],

        friendId : 45,

        commonNum : 0,

        startup : function() {
            this.inherited(arguments);
        },

         postCreate : function(){
            
         }, 

         _handleDetailClick : function(evt){
            params = {
                friendId : this.friendId
            }
            this.delegate._handleFriendClick(params);
         }

     });
 });