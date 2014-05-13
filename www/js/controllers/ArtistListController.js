define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/ArtistListView.html", 
     "dojo/dom-style", 
     "dojo/_base/lang", 
     "dojo/dom-construct", 
     "js/views/ArtistListItem", 
     "dojo/dom-class", 
     "data/Model", 
     "dojo/dom-attr"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, domStyle, lang, domConstruct, ArtistListItem, domClass, Model, domAttr){

     return declare("ArtistListController", [_WidgetBase, _TemplatedMixin], {

        templateString: template,

        showingMyList : true,

        cellHeight: 51, 

        startup : function() {
            this.inherited(arguments);
            this._getArtists();
        },

         postCreate : function(){
            //calculate new height for artistList
            domStyle.set(this.domNode, {
                height: window.innerHeight - 20 + 'px'
            });

            domStyle.set(this.artistList, {
                height: window.innerHeight - (128) + 'px'
            });

            this.model = new Model();
         }, 

         _getArtists : function(){
            //ajax to json for this data
            this.model.getMyArtistList({}, lang.hitch(this, "_handleSuccess"), lang.hitch(this, "_handleError"));
         }, 

         _handleSuccess : function(data){
            this.myData = data;
            this._addArtists(data);
         }, 

         _handleError : function(err){
            console.log('ERROR: ', err);
         }, 

         _addArtists : function(data){
            //empty existing domNodes
            domConstruct.empty(this.artistList);

            for (var i = 0; i < data.length; i++){
                var item = data[i];

                var listItem = new ArtistListItem({
                    artistName : item.artistName, 
                    delegate: this
                });
                domConstruct.place(listItem.domNode, this.artistList, "last");
            }
         },

         _handleMyToggleList : function(evt){
            if (this.showingMyList){return;}
            //show my list of albums
            // this._addAlbums(this.myData);
            this.showingMyList = true;
            domClass.add(this.followBtn, "selected");
            domClass.remove(this.allBtn, "selected");
         }, 

         _handleAllToggleList : function(evt){
            if (!this.showingMyList){return;}
            //show the popular album list
            // this._addAlbums(this.popularData);
            this.showingMyList = false;
            domClass.remove(this.followBtn, "selected");
            domClass.add(this.allBtn, "selected");
         },

         _handleArtistClick : function(data){
            this.delegate.artistDetail.getArtist(data.artistId);
            domAttr.set(this.delegate.artistDetail.router, "href", "#artists");
            $.mobile.changePage("#artistDetail", {transition: 'slide'});
         }

     });
 });