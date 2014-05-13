define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/ArtistDetailView.html", 
     "dojo/dom-style", 
     "js/views/ArtistListItem", 
     "dojo/dom-construct", 
     "dojo/_base/lang", 
     "dojo/on", 
     "dojo/dom-class", 
     "data/Model", 
     "js/views/ArtistDetailAlbumListItem", 
     "dojo/dom-attr"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, domStyle, AlbumListItem, domConstruct, lang, on, domClass, Model, ArtistDetailAlbumListItem, domAttr){

     return declare("ArtistDetailController", [_WidgetBase, _TemplatedMixin], {
        //TODO:
        //1)Sort by date and add 'today' div
        //2)Add 'Following/Popular' toggle

        templateString: template,

        model: [],

        artistData: null, 

        artistId : undefined,

        startup : function() {
            this.inherited(arguments);
        },

        getArtist : function(artistId){
            this.artistId = artistId;
            this._getArtist(artistId);
        },

         postCreate : function(){
            //calculate new height for albumList
            domStyle.set(this.domNode, {
                height: window.innerHeight - 20 + 'px'
            });
            
            domStyle.set(this.albumList, {
                height: window.innerHeight/2 - 61 + 'px' //110
            });

            this.model = new Model();
         }, 

         _getArtist : function(){
            //empty existing domNodes
            domConstruct.empty(this.albumList);
            domAttr.set(this.artistImg, "src", "img/blank.jpg");
            this.artistName.innerHTML = "";
            domConstruct.empty(this.genreList);
            this.artistDesc.innerHTML = "";

            //ajax to json for this data
            this.model.getArtist({artistId: this.artistId}, lang.hitch(this, "_handleSuccess"), lang.hitch(this, "_handleError"));
         }, 

         _handleSuccess : function(data){
            this.artistData = data;
            this._addArtist(data);
         }, 

         _handleError : function(err){
            console.log('ERROR: ', err);
         }, 

         _addArtist : function(data){
            domAttr.set(this.artistImg, "src", data.pictureUrl);
            this.artistName.innerHTML = data.artistName;
            this.artistDesc.innerHTML = data.artistDesc;

            //add genres:
            for (var m=0; m < data.genres.length; m++){
                var item = data.genres[m], 
                newHTML = "<span class='genre-item'>"+item+"</span>"
                domConstruct.place(newHTML, this.genreList, "last");
            }

            //add albums
            for (var i = 0; i < data.albums.length; i++){
                var item = data.albums[i]; 

                var listItem = new ArtistDetailAlbumListItem({
                    albumName : item.albumName, 
                    releaseDate : item.releaseDate, 
                    delegate : this
                });
                domConstruct.place(listItem.domNode, this.albumList, "last");
            }
         }, 

         _handleAlbumClick : function(data){
            this.delegate.albumDetail.getAlbum(data.albumId);
            domAttr.set(this.delegate.albumDetail.router, "href", "#artistDetail");
            $.mobile.changePage("#albumDetail", {transition: 'slide'});
         },

         _handleBuyNowClick : function(evt){
            console.log('clicked buy now')
         }

     });
 });