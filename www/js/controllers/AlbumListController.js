define([
     "dojo/_base/declare",
     "dojo/parser",
     "dojo/ready",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin", 
     "dojo/text!js/templates/AlbumListView.html", 
     "dojo/dom-style", 
     "js/views/AlbumListItem", 
     "dojo/dom-construct", 
     "dojo/_base/lang", 
     "dojo/on", 
     "dojo/dom-class", 
     "data/Model", 
     "dojo/dom-attr"
 ], function(declare, parser, ready, _WidgetBase, _TemplatedMixin, template, domStyle, AlbumListItem, domConstruct, lang, on, domClass, Model, domAttr){

     return declare("AlbumListController", [_WidgetBase, _TemplatedMixin], {
        //TODO:
        //1)Sort by date and add 'today' div
        //2)Add 'Following/Popular' toggle

        templateString: template,

        model: [],

        delegate: [],

        myData: null, 

        popularData: null,

        monthNames : ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

        showingMyList : true,

        startup : function() {
            this.inherited(arguments);
            this._getAlbums();
        },

         postCreate : function(){
            //calculate new height for albumList
            domStyle.set(this.domNode, {
                height: window.innerHeight - 20 + 'px'
            });
            
            domStyle.set(this.albumList, {
                height: window.innerHeight - (87) + 'px'
            });

            this.model = new Model();
         }, 

         _getAlbums : function(){
            //ajax to json for this data
            this.model.getMyAlbumList({}, lang.hitch(this, "_handleSuccess"), lang.hitch(this, "_handleError"));
            this.model.getPopularAlbumList({}, lang.hitch(this, "_handlePopSuccess"), lang.hitch(this, "_handleError"));
         }, 

         _handleSuccess : function(data){
            this.myData = data;
            this._addAlbums(data);
         }, 

         _handlePopSuccess : function(data){
            this.popularData = data;
            // this._addAlbums(data);
         }, 

         _handleError : function(err){
            console.log('ERROR: ', err);
         }, 

         _addAlbums : function(data){
            // console.log(data)
            //empty existing domNodes
            domConstruct.empty(this.albumListFirst);
            domConstruct.empty(this.albumListLast);

            for (var i = 0; i < data.albums.length; i++){
                var item = data.albums[i], 
                rawDate = this.createDate(item.released),
                formattedDate = this.formatDate(rawDate), 
                currentDate = new Date();

                var listItem = new AlbumListItem({
                    bandName : item.artist_name, 
                    albumName : item.album_name, 
                    releaseDate : formattedDate, 
                    delegate : this
                });
                domAttr.set(listItem.domNode, "data-index", i);
                // on(listItem, 'click', lang.hitch(this, "_handleDetailClick"));

                console.log('greater than today: ', rawDate)
                //split based on date:
                if (rawDate >= currentDate){
                    domConstruct.place(listItem.domNode, this.albumListFirst, "last");
                } else {
                    domConstruct.place(listItem.domNode, this.albumListLast, "last");
                }
            }
         },

         createDate : function(date){
            var dateArray = date.split('-');
            var year = dateArray[0], 
            month = dateArray[1], 
            day = dateArray[2];
            return new Date(year, month-1, day);
         },

         formatDate : function(date){
            return this.monthNames[date.getMonth()]+" "+date.getDate();
         }, 

         _handleMyToggleList : function(evt){
            if (this.showingMyList){return;}
            //show my list of albums
            this._addAlbums(this.myData);
            this.showingMyList = true;
            domClass.add(this.followBtn, "selected");
            domClass.remove(this.popularBtn, "selected");
         }, 

         _handlePopularToggleList : function(evt){
            if (!this.showingMyList){return;}
            //show the popular album list
            this._addAlbums(this.popularData);
            this.showingMyList = false;
            domClass.remove(this.followBtn, "selected");
            domClass.add(this.popularBtn, "selected");
         },

         _handleDetailClick : function(data){
            this.delegate.albumDetail.getAlbum(data.albumId);
            domAttr.set(this.delegate.albumDetail.router, "href", "#albums");
            $.mobile.changePage("#albumDetail", {transition: 'slide'});
         }

     });
 });