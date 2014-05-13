define([
     "dojo/_base/declare",
     "dijit/_WidgetBase",
     "utils/fastclick", 
     "js/controllers/NavController", 
     "dojo/dom-construct", 
     "utils/hammer.js/hammer", 
     "data/Model"
 ], function(declare, _WidgetBase, fastclick, NavController, domConstruct, Hammer, Model){

     return declare("app", [_WidgetBase], {

        startup : function() {
            this.inherited(arguments);
                    
            // Build global model
            // this.model = new Model({baseUrl:"/"});

            //attach fastclick
            if (fastclick && fastclick.attach){
                fastclick.attach(document.body);
            }
        },

         postCreate : function(){
            //add NavController
            this._createGestureEvents();
            // this._buildNavController();
         }, 

         _buildNavController : function(){
            this.model = new Model();
            this.navController = new NavController({
                delegate: this, 
                model: this.model
            });
            this.navController.startup();
            domConstruct.place(this.navController.domNode, this.domNode, "replace");
         }, 

         _createGestureEvents : function(){
            Hammer(document.body).on("swipeleft swiperight", function(e){
                console.log('swipe')
                ev.gesture.preventDefault();
                if (ev.type == "swipeleft"){
                    //swipe left
                } else {
                    //swipe right
                }
            });
         }

     });
 });