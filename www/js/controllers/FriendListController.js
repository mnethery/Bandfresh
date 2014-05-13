define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/FriendListView.html", 
     "dojo/dom-style", 
     "js/views/FriendListItem", 
     "dojo/_base/lang", 
     "dojo/dom-construct", 
     "dojo/dom-class", 
     "data/Model", 
     "dojo/dom-attr"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, domStyle, FriendListItem, lang, domConstruct, domClass, Model, domAttr){

     return declare("FriendListController", [_WidgetBase, _TemplatedMixin], {

        templateString: template,

        templateString: template,

        showingMyList : true,

        startup : function() {
            this.inherited(arguments);
            this._getFriends();
        },

         postCreate : function(){
            //adjust scrollable area for friendList scrollview
            domStyle.set(this.domNode, {
                height: window.innerHeight - 20 + 'px'
            });
            
            domStyle.set(this.friendList, {
                height: window.innerHeight - (125) + 'px'
            });

            this.model = new Model();
         }, 

         _getFriends : function(){
            //ajax to json for this data
            this.model.getMyFriendList({}, lang.hitch(this, "_handleSuccess"), lang.hitch(this, "_handleError"));
         }, 

         _handleSuccess : function(data){
            this.myData = data;
            this._addFriends(data);
         }, 

         _handleError : function(err){
            console.log('ERROR: ', err);
         }, 

         _addFriends : function(data){
            //empty existing domNodes
            domConstruct.empty(this.friendList);

            for (var i = 0; i < data.length; i++){
                var item = data[i];

                var listItem = new FriendListItem({
                    friendName : item.friendName, 
                    commonNum : item.commonNum, 
                    delegate: this
                });
                domConstruct.place(listItem.domNode, this.friendList, "last");
            }
         },

         _handleNameToggleList : function(evt){
            if (this.showingMyList){return;}
            //show my list of albums
            // this._addAlbums(this.myData);
            this.showingMyList = true;
            domClass.add(this.nameBtn, "selected");
            domClass.remove(this.similarBtn, "selected");
         },

         _handleSimilarToggleList : function(evt){  
            if (!this.showingMyList){return;}
            //show my list of albums
            // this._addAlbums(this.myData);
            this.showingMyList = false;
            domClass.remove(this.nameBtn, "selected");
            domClass.add(this.similarBtn, "selected");
         }, 

         _handleFriendClick : function(data){
            this.delegate.friendDetail.getFriend(data.friendId);
            domAttr.set(this.delegate.friendDetail.router, "href", "#friends");
            $.mobile.changePage("#friendDetail", {transition: 'slide'});
         }

     });
 });