define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/request",
	"dojo/request/xhr",
	"dojo/json",
	"dojo/topic"
  ], function(declare, lang, request, xhr, JSON, topic){

  	return declare([], {


  		ajax : function(args) {
        	var url = args.url,
        		headers = (args.headers || {});               
        	
        	return xhr(url, {
        		handleAs : (args.handleAs || "xml"),
				preventCache : (args.hasOwnProperty("preventCache") ? args.preventCache : true),
				headers : headers,
				timeout : (args.timeout || 25000),
				method : (args.method || "GET"),
				sync : (args.sync || false),
				data : args.data
			}).then(lang.hitch(this, "_handleAjaxSuccess", args), lang.hitch(this, "_handleAjaxError", args));
        },        
        
        _handleAjaxSuccess : function(args, data) {
        	// invoke the success handler if one is specified
            if (args.success && args.success instanceof Function) {
            	try {
            		args.success(data);
            	}
            	catch (err) {
            		console.log(err.toString());
            	}
            }
        },
        
        _handleAjaxError : function(args, err) {
        	if (err && err.response && err.response.status === 401 && args && args.method !== "DELETE" && args.method !== "POST" && args.method !== "PUT") {
				  topic.publish("/xhr/unauthorized", err.response.status);
			}
        	// invoke the success handler if one is specified
            if (args.error && args.error instanceof Function) {
            	args.error(err);
            }
            else {
            	// TODO temporary
            	console.log(err);
            }
        },

		getMyAlbumList : function(params, success, error) {
			return this.ajax({
					url: "./data/fixtures/myAlbumList.json",
					// url: "http://data.bandfresh.com/albums"
					method : "GET",
					success : success,
					error : error,
					preventCache : true,
					handleAs : "json",
					timeout : 120000
			});
		}, 

		getPopularAlbumList : function(params, success, error) {
			return this.ajax({
					// url: "./data/fixtures/popAlbumList.json",
					url: "http://data.bandfresh.com/albums",
					method : "GET",
					success : success,
					error : error,
					preventCache : true,
					handleAs : "json",
					timeout : 120000
			});
		}, 

		getMyArtistList : function(params, success, error) {
			return this.ajax({
					url: "./data/fixtures/myArtistList.json",
					method : "GET",
					success : success,
					error : error,
					preventCache : true,
					handleAs : "json",
					timeout : 120000
			});
		}, 

		getMyFriendList : function(params, success, error) {
			return this.ajax({
					url: "./data/fixtures/myFriendList.json",
					method : "GET",
					success : success,
					error : error,
					preventCache : true,
					handleAs : "json",
					timeout : 120000
			});
		}, 

		getAlbum : function(params, success, error){
			return this.ajax({
					url: "./data/fixtures/album.json",
					method : "GET",
					success : success,
					error : error,
					preventCache : true,
					handleAs : "json",
					timeout : 120000
			});
		}, 

		getArtist : function(params, success, error){
			return this.ajax({
					url: "./data/fixtures/artist.json",
					method : "GET",
					success : success,
					error : error,
					preventCache : true,
					handleAs : "json",
					timeout : 120000
			});
		}, 

		getFriend : function(params, success, error){
			return this.ajax({
					url: "./data/fixtures/friend.json",
					method : "GET",
					success : success,
					error : error,
					preventCache : true,
					handleAs : "json",
					timeout : 120000
			});
		}

	});

});