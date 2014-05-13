define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/Nav.html", 
     "js/controllers/AlbumListController", 
     "dojo/dom-construct", 
     "js/controllers/ArtistListController", 
     "dojo/dom-style", 
     "js/controllers/FriendListController", 
     "js/controllers/SettingsController"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, AlbumListController, domConstruct, ArtistListController, domStyle, FriendListController, SettingsController){

     return declare("NavController", [_WidgetBase, _TemplatedMixin], {

        templateString: template,

        delegate: null,

        model : [],

        viewHeight: 20,//86 //55

        startup : function() {
            this.inherited(arguments);
        },

         postCreate : function(){
            //add elements
            // this._createSettings();
            // this._createFriendController();
            this._createAlbumController();
            this._createArtistController();
            
         }, 

         _defineScrollRange : function(){
            domStyle.set(this.scrollContainer, {
                width:window.innerWidth
            });
         },

         _handleRightClick : function(){
            this.scrollContainer.scrollleft = window.innerWidth*3
         },

         _createSettings : function(){
            this.settingsController = new SettingsController({
                model: this.model
            });
            this.settingsController.startup();
            domConstruct.place(this.settingsController.domNode, this.scrollContainer, "last");

            domStyle.set(this.settingsController.domNode, {
                // left: (window.innerWidth*3)+'px', 
                height: window.innerHeight - this.viewHeight + 'px'
            });
         },

         _createFriendController : function(){
            this.friendListController = new FriendListController({
                model: this.model
            });
            this.friendListController.startup();
            domConstruct.place(this.friendListController.domNode, this.scrollContainer, "last");

            //first view to the left:
            domStyle.set(this.friendListController.domNode, {
                left: (window.innerWidth)+'px', 
                height: window.innerHeight - this.viewHeight + 'px'
            });
         }, 

         _createAlbumController : function(){
            this.albumListController = new AlbumListController({
                model: this.model
            });
            this.albumListController.startup();
            domConstruct.place(this.albumListController.domNode, this.scrollContainer, "last");

            domStyle.set(this.albumListController.domNode, {
                // left: (window.innerWidth*2)+'px', 
                height: window.innerHeight - this.viewHeight + 'px'
            });
         }, 

         _createArtistController : function(){
            this.artistListController = new ArtistListController({
                model: this.model
            });
            this.artistListController.startup();
            domConstruct.place(this.artistListController.domNode, this.scrollContainer, "last");
            
            //first view to the right:
            domStyle.set(this.artistListController.domNode, {
                // left: (window.innerWidth)+'px', //was 3
                height: window.innerHeight - this.viewHeight + 'px'
            });
         }, 

         _handleModalClick : function(param){

         }
     });
 });