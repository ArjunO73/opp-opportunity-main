({
    doInit: function(component, event, helper) {
        // Create the action
        var actionGetAdminSettings = component.get("c.getAdminSetup");
        actionGetAdminSettings.setCallback(this, function(result) {
            //store response state 
            var state = result.getState();
            if (state === "SUCCESS") {
                component.set("v.adminSettings", result.getReturnValue());
                var action = component.get("c.getOptyList");
                var filterlabel =event.getParam("FilterLabel")?event.getParam("FilterLabel"):component.get("v.filterlabel");
                if(filterlabel != ''){
                    component.set("v.filterlabel",filterlabel);
                }
                var filtername =event.getParam("OptyListFilter")?event.getParam("OptyListFilter"):component.get("v.FilterName");
                component.set("v.FilterName",filtername);
                action.setParams({ScopeName:filtername,LimitRecords:component.get("v.adminSettings.Opty_Record_count__c"),FieldsString:'Id, Name, Probability, Account.Name,StageName, CreatedDate,LastModifiedDate',ObjecttoQuery:'Opportunity'});
                // Add callback behavior for when response is received
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        component.set("v.sObjectRecords", response.getReturnValue());
                        var OppListset = component.get("v.sObjectRecords");
                        var FavoritesList = component.get("v.Favorites");
                        if(FavoritesList != "" && FavoritesList != null && typeof(FavoritesList) != "undefined	"){
                            var FavrtJSON = JSON.parse(FavoritesList).favorites;
                            if(typeof(OppListset) != "undefined"){
                                for(var i=0;i<OppListset.length;i++){                        
                                    if( FavoritesList.indexOf(OppListset[i].Id) != -1)
                                    {
                                        OppListset[i].IsFavorite = "block";
                                        OppListset[i].IsNotFavorite = "none";
                                        for(var k=0;k<FavrtJSON.length;k++){
                                            if(FavrtJSON[k].target == OppListset[i].Id){
                                                OppListset[i].FavrtId = FavrtJSON[k].id;
                                            }
                                        }
                                    }
                                    else{
                                        OppListset[i].IsFavorite = "none";
                                        OppListset[i].IsNotFavorite = "block";
                                    }                                  
                                }
                                
                            }
                            component.set("v.sObjectRecords",OppListset);
                        }
                        
                    } else {
                        console.log("Failed with state: " + state);
                    }
                });
                // Send action off to be executed
                $A.enqueueAction(action);
                
                //GetFavorites
                // component.set("v.FilterName","");
                if(component.get("v.Favorites") == "" || component.get("v.Favorites") == null)
                {
                    var Favorites = component.get("c.getFavorites");
                    Favorites.setCallback(this, function(response) {
                        if (response.getReturnValue().indexOf("favorites") != -1) {
                            component.set("v.Favorites", response.getReturnValue());
                            var OppListset = component.get("v.sObjectRecords");
                            var FavoritesList = component.get("v.Favorites");
                            if(FavoritesList != "" && FavoritesList != null && typeof(FavoritesList) != "undefined"){
                                var FavrtJSON = JSON.parse(FavoritesList).favorites;
                                if(typeof(OppListset) != "undefined")
                                {
                                    for(var i=0;i<OppListset.length;i++){
                                        if( FavoritesList.indexOf(OppListset[i].Id) != -1)
                                        {
                                            OppListset[i].IsFavorite = "block";
                                            OppListset[i].IsNotFavorite = "none";
                                            for(var k=0;k<FavrtJSON.length;k++){
                                                if(FavrtJSON[k].target == OppListset[i].Id){
                                                    OppListset[i].FavrtId = FavrtJSON[k].id;
                                                }
                                            }
                                        }
                                        else{
                                            OppListset[i].IsFavorite = "none";
                                            OppListset[i].IsNotFavorite = "block";
                                        }                                  
                                    }
                                    component.set("v.sObjectRecords",OppListset);                            
                                }
                                
                            }
                        }
                        else {
                            console.log("Failed with state: " + state);
                        }
                    });
                    // Send action off to be executed
                    $A.enqueueAction(Favorites);
                } 
            }
        });
        // enqueue the Action   
        $A.enqueueAction(actionGetAdminSettings);
        
    },
    handleFavorites:function(component, event, helper){
        var OppListset = component.get("v.sObjectRecords");
        var FavoritesList = component.get("v.Favorites");
        var Favorites = "";
        if(FavoritesList != "" && FavoritesList != null && typeof(FavoritesList) != "undefined	"){
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
            component.set("v.sObjectRecords",OppListset);
        }
        if(Favorites != "")
            component.set("v.FavoritesList", Favorites);
    },
    EditOpty: function(c,e,h){
        c.set("v.EditOpty",e.getParams("EditOpty"));
    },
    handleSaveSuccess:function(component, event, helper){
        console.log("handled");
        $A.get('e.force:refreshView').fire();
    },
    NewFavoriteOpty : function(c,e,h){
        
        if(typeof(e.getParam("NewFavoriteOpty")) != "undefined" && e.getParam("NewFavoriteOpty") != "")
        {
            var action = c.get("c.CreateFavorite");
            action.setParams({FavoriteList:'{"target":"'+e.getParam("NewFavoriteOpty")+'","targetType":"Record"}'});
            action.setCallback(this, function(response) {
                if(response.getState() == "SUCCESS"){
                    $A.get('e.force:refreshView').fire();
                }
            })
            $A.enqueueAction(action);
            
        }
        else if(typeof(e.getParam("DeleteFavoriteOpty")) != "undefined" && e.getParam("DeleteFavoriteOpty") != "")
        {
            var action = c.get("c.DeleteFavorite");
            action.setParams({"target":e.getParam("DeleteFavoriteOpty")});
            action.setCallback(this, function(response) {
                if(response.getState() == "SUCCESS"){
                    $A.get('e.force:refreshView').fire();
                }
            })
            $A.enqueueAction(action);
        }
    },
    toastInfo: function(cmp,evt,hlp) {
        
        var response = evt.getParams().type;
        var object = evt.getParams()["messageTemplateData"];
        if(typeof(object) != "undefined" && object!=""){
            object = object[0];
        }
        if(response == "SUCCESS")
        {//var recId = evt.getParam("messageTemplateData")[1].executionComponent["attributes"].recordId;
            //hlp.getEvents(cmp);
            //$("#calendar").fullCalendar('removeEventSource',cmp.get('v.events'));
            switch(object)
            {
                case "Contact":console.log("Contact Toast");
                    //$A.get('e.force:refreshView').fire();
                    var childComponent = cmp.find("contactsPanel");
                    childComponent.getContactsPanel();
                    break;
                default:
                    break;
            }
        }
        return false;
    },
    handleShowSyncOptyProcess: function(component, event, helper){
        component.set("v.ShowSyncOptyProcess","Show");
        component.set("v.OptyToSync",event.getParam("OptyToSync"));
    },
})