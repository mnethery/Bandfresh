define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/FriendDetailView.html", 
     "dojo/dom-style", 
     "js/views/ArtistListItem", 
     "dojo/dom-construct", 
     "dojo/_base/lang", 
     "dojo/on", 
     "dojo/dom-class", 
     "data/Model", 
     "js/views/ArtistListItem", 
     "dojo/dom-attr"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, domStyle, AlbumListItem, domConstruct, lang, on, domClass, Model, ArtistListItem, domAttr){

     return declare("FriendDetailController", [_WidgetBase, _TemplatedMixin], {
        //TODO:
        //1)Sort by date and add 'today' div
        //2)Add 'Following/Popular' toggle

        templateString: template,

        model: [],

        friendData: null, 

        friendId : undefined,

        startup : function() {
            this.inherited(arguments);
        },

        getFriend : function(friendId){
            this.friendId = friendId;
            this._getFriend(friendId);
        },

         postCreate : function(){
            //calculate new height for albumList
            domStyle.set(this.domNode, {
                height: window.innerHeight - 20 + 'px'
            });
            
            domStyle.set(this.artistList, {
                height: window.innerHeight/2 - 15 + 'px' //110
            });

            this.model = new Model();
         }, 

         _getFriend : function(){
            //clear the way for new data:
            //empty existing domNodes
            domConstruct.empty(this.artistList);
            this.friendName.innerHTML = "";
            this.commonNum.innerHTML = "";
            domAttr.set(this.friendImg, "src", "img/blank.jpg");

            //ajax to json for this data
            this.model.getFriend({artistId: this.artistId}, lang.hitch(this, "_handleSuccess"), lang.hitch(this, "_handleError"));
         }, 

         _handleSuccess : function(data){
            this.artistData = data;
            this._addArtist(data);
         }, 

         _handleError : function(err){
            console.log('ERROR: ', err);
         }, 

         _addArtist : function(data){
            //add base data:
            this.friendName.innerHTML = data.friendName;
            this.commonNum.innerHTML = data.commonNum;
            domAttr.set(this.friendImg, "src", data.pictureUrl);

            for (var i = 0; i < data.artists.length; i++){
                var item = data.artists[i]; 

                var listItem = new ArtistListItem({
                    artistName : item.name, 
                    delegate : this
                });
                domConstruct.place(listItem.domNode, this.artistList, "last");
            }
         }, 

         _handleBuyNowClick : function(evt){
            console.log('clicked buy now')
         }, 

         _handleArtistClick : function(data){
            this.delegate.artistDetail.getArtist(data.artistId);
            domAttr.set(this.delegate.artistDetail.router, "href", "#friendDetail");
            $.mobile.changePage("#artistDetail", {transition: 'slide'});
         }

     });
 });