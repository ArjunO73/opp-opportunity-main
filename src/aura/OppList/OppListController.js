({
	doInit: function(component, event, helper) {
        // Create the action
        var action = component.get("c.getOptyList");
        var filtername =event.getParam("OptyListFilter")?event.getParam("OptyListFilter"):component.get("v.FilterName");
        component.set("v.FilterName",filtername);
        var filterlabel =event.getParam("FilterLabel")?event.getParam("FilterLabel"):component.get("v.filterlabel");
        if(filterlabel != ''){
            component.set("v.filterlabel",filterlabel);
        }
        action.setParams({ScopeName:filtername});
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.Opportunities", response.getReturnValue());
                var OppListset = component.get("v.Opportunities");
                var FavoritesList = component.get("v.Favorites");
                if(FavoritesList != "" && FavoritesList != null && typeof(FavoritesList) != "undefined"){
                    if(typeof(OppListset) != "undefined"){
                    	for(var i=0;i<OppListset.length;i++){                        
                            if( FavoritesList.indexOf(OppListset[i].Id) != -1)
                            	{
                                    OppListset[i].IsFavorite = "block";
                                    OppListset[i].IsNotFavorite = "none";
                                }
                                else{
                                    OppListset[i].IsFavorite = "none";
                                    OppListset[i].IsNotFavorite = "block";
                                }                                  
                         }
                        
                    }
                        component.set("v.Opportunities",OppListset);
                }
            }
           /* else {
                console.log("Failed with state: " + state);
            }*/
        });
        // Send action off to be executed
        $A.enqueueAction(action);
        
        //GetFavorites
       // component.set("v.FilterName","");
       if(component.get("v.Favorites") == "" || component.get("v.Favorites") == null || typeof(component.get("v.Favorites")) == "undefined")
        {
            var Favorites = component.get("c.getFavorites");
            Favorites.setCallback(this, function(response) {
                if (response.getReturnValue().indexOf("favorites") != -1) {
                    component.set("v.Favorites", response.getReturnValue());
                    var OppListset = component.get("v.Opportunities");
                    var FavoritesList = component.get("v.Favorites");
                    if(FavoritesList != "" && FavoritesList != null && typeof(FavoritesList) != "undefined"){
                        if(typeof(OppListset) != "undefined")
                        {
                            for(var i=0;i<OppListset.length;i++){
                                if( FavoritesList.indexOf(OppListset[i].Id) != -1)
                                {
                                    OppListset[i].IsFavorite = "block";
                                    OppListset[i].IsNotFavorite = "none";
                                }
                                else{
                                    OppListset[i].IsFavorite = "none";
                                    OppListset[i].IsNotFavorite = "block";
                                }                                  
                            }
                            component.set("v.Opportunities",OppListset);                            
                        }
                        
                    }
                }
                /*else {
                    console.log("Failed with state: " + state);
                }*/
            });
            // Send action off to be executed
            $A.enqueueAction(Favorites);
        }       
    },
    handleFavorites:function(component, event, helper){
        var OppListset = component.get("v.Opportunities");
        var FavoritesList = component.get("v.Favorites");
        var Favorites = "";
        if(FavoritesList != "" && FavoritesList != null && typeof(FavoritesList) != "undefined"){
            for(var i=0;i<OppListset.length;i++){
                if( FavoritesList.indexOf(OppListset[i].Id) != -1)
                {
                    Favorites += OppListset[i].Id+",";
                	OppListset[i].IsFavorite = "block";
                	OppListset[i].IsNotFavorite = "none";
                }
                else{
                    OppListset[i].IsFavorite = "none";
                	OppListset[i].IsNotFavorite = "block";
                }                                  
            }
             component.set("v.Opportunities",OppListset);
        }
        if(Favorites != "")
            component.set("v.FavoritesList", Favorites);
    },
    EditOpty: function(c,e,h){
        c.set("v.EditOpty",e.getParams("EditOpty"));
    },
    handleShowSyncOptyProcess: function(c,e,h){
        c.set("v.ShowSyncOptyProcess","Show");
        c.set("v.OptyToSync",e.getParam("OptyToSync"));
    },
    handleSaveSuccess:function(component, event, helper){
        console.log("handled");
        $A.get('e.force:refreshView').fire();
    },
    NewFavoriteOpty : function(c,e,h){
        var action = c.get("c.CreateFavorite");
        action.setParams({FavoriteList:'{"target":"'+e.getParam("NewFavoriteOpty")+'","targetType":"Record"}'});
        /*action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("created favorite");
            }
            else {
                console.log("Failed with state: " + state);
            }
        });*/
        // Send action off to be executed
        $A.enqueueAction(action,false);
    }
})