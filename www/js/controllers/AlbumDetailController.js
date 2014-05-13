define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/AlbumDetailView.html", 
     "dojo/dom-style", 
     "js/views/AlbumListItem", 
     "dojo/dom-construct", 
     "dojo/_base/lang", 
     "dojo/on", 
     "dojo/dom-class", 
     "data/Model", 
     "js/views/TrackListItem", 
     "dojo/dom-attr"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, domStyle, AlbumListItem, domConstruct, lang, on, domClass, Model, TrackListItem, domAttr){

     return declare("AlbumDetailController", [_WidgetBase, _TemplatedMixin], {
        //TODO:
        //1)Sort by date and add 'today' div
        //2)Add 'Following/Popular' toggle

        templateString: template,

        model: [],

        myData: null, 

        popularData: null,

        monthNames : ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],

        showingMyList : true,

        albumId : undefined,

        startup : function() {
            this.inherited(arguments);
        },

        getAlbum : function(albumId){
            this.albumId = albumId;
            this._getAlbum(albumId);
        },

         postCreate : function(){
            //calculate new height for albumList
            domStyle.set(this.domNode, {
                height: window.innerHeight - 20 + 'px'
            });
            
            domStyle.set(this.trackList, {
                height: window.innerHeight/2 - 40 + 'px'
            });

            this.model = new Model();
         }, 

         _getAlbum : function(){
            //empty existing domNodes
            domConstruct.empty(this.trackList);
            this.artistName.innerHTML = "";
            this.albumName.innerHTML = "";
            this.releaseDate.innerHTML = "";
            domAttr.set(this.albumImg, "src", "img/blank.jpg");

            //ajax to json for this data
            this.model.getAlbum({albumId: this.albumId}, lang.hitch(this, "_handleSuccess"), lang.hitch(this, "_handleError"));
         }, 

         _handleSuccess : function(data){
            this.albumData = data;
            this._addAlbum(data);
         }, 

         _handleError : function(err){
            console.log('ERROR: ', err);
         }, 

         _addAlbum : function(data){
            var year = data.releaseDate.year, 
            month = data.releaseDate.month, 
            day = data.releaseDate.day;
            this.artistName.innerHTML = "by "+data.artistName;
            this.albumName.innerHTML = data.albumName;
            domAttr.set(this.albumImg, "src", data.pictureUrl);
            this.releaseDate.innerHTML = this.formatDate(data.releaseDate);

            for (var i = 0; i < data.tracks.length; i++){
                var item = data.tracks[i]; 

                var listItem = new TrackListItem({
                    trackName : item.title, 
                    trackLength : item.length, 
                    trackNum : i
                });
                domConstruct.place(listItem.domNode, this.trackList, "last");
            }
         }, 

         _handleBuyNowClick : function(evt){
            console.log('clicked buy now')
         }, 

         formatDate : function(date){
            var year = date['year'], 
            month = this.monthNames[date['month']], 
            day = date['day'];
            return month+" "+day+", "+year;
         }

     });
 });