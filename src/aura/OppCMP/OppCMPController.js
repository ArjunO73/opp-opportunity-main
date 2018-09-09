({
    alignMenu:function(component, event, helper){
        var AlignmentOptions = component.get("v.MenuAlignment");
        component.set("v.MenuPosition",AlignmentOptions[component.get("v.MenuAlignmentindex")])
    },
    EditOpp : function(component, event, helper) {
        var id = "";
        var actionType = "";
        if(event.srcElement != null && event.srcElement.checked){
            actionType = "NewOptyProduct";
            id = event.srcElement.value;
        }else if(event.srcElement != null && !event.srcElement.checked){
            actionType = "";
            id = "";
        }else if(event.srcElement == null){
            id=event.getSource().get("v.value");
        }
        var createEvent = component.getEvent("EditOpty");
        
        if(actionType == "NewOptyProduct"){
            createEvent.setParams({ "EditOpty": id,"EditOptyType": actionType});
            createEvent.fire();
        } else if(id!=""){
            
        }
    },
    handleMenuSelectbutton:function(cmp, e){
        if(!cmp.find("inlineMenuContainer").getElement().classList.contains("slds-is-open"))
        	cmp.find("inlineMenuContainer").getElement().classList.add("slds-is-open");
    },
    handleMenuSelect:function(cmp, e) {
        var selectedMenuItemValue = e.getParam("value");
        if(selectedMenuItemValue == "NewOpty"){
            cmp.set("v.ShowNewOpty","Show");
        }
        else if (selectedMenuItemValue == "AddProductsOOB"){
            var actionAPI = cmp.find("quickActionAPI");
            var args = {
                actionName: "OpportunityLineItem.AddProduct"
            };
            actionAPI.selectAction(args).then(function (result) {
                var fields = result.targetableFields;
                //Action selected; show data and set field values
            }).catch (function (e) {
                if (e.errors) {
                    //If the specified action isn't found on the page, show an error message in the my component
                }
            });
        }
        else if(selectedMenuItemValue == "AddActivity"){
            var createRecordEvent = $A.get("e.force:createRecord");
            createRecordEvent.setParams({
                "entityApiName": "Task",
                "navigationLocation":"LOOKUP",
                "panelOnCreateCallback":function(event){
                    console.log(event);
                }
            });
            createRecordEvent.fire();
        }
            else if(selectedMenuItemValue == "AddProduct"){
                var createEvent = cmp.getEvent("EditOpty");
                createEvent.setParams({ "EditOpty": cmp.get("v.OpportunityId"),"EditOptyType": "NewOptyProduct","EditOptyName":cmp.get("v.Opportunity.Name")});
                createEvent.fire();
            }
                else if(selectedMenuItemValue == "SyncOpty"){
                    var EventNextClick = cmp.getEvent("ShowSyncOptyProcess");
                    EventNextClick.setParams({"SyncOptyProcessTrigger":"Show","OptyToSync":cmp.get("v.OpportunityId")});
                    EventNextClick.fire();
                }
                    else if(selectedMenuItemValue == "EditOpty"){
                        var createEvent = cmp.getEvent("EditOpty");
                        createEvent.setParams({ "EditOpty": cmp.get("v.OpportunityId"),"EditOptyType": ""});
                        createEvent.fire();
                    }
    },
    toggleFavoriteCheckBox : function(c,e,h){
        var elementClicked = e.target;
        elementClicked.style.display = "none";
        var siblingelement = elementClicked.nextSibling == null ? elementClicked.previousSibling:elementClicked.nextSibling;
        if(siblingelement != null)
            siblingelement.style.display = "block";
        var FavoritecheckBox = elementClicked.parentElement.parentElement.children[0];
        FavoritecheckBox.checked = !(FavoritecheckBox.checked);
        if(FavoritecheckBox.checked)
        {
            var createEvent = c.getEvent("NewFavoriteOpty");
            if(elementClicked.classList.contains("slds-is-selected")){
                createEvent.setParams({"DeleteFavoriteOpty":elementClicked.getAttribute("value")});
            }
            else{
                createEvent.setParams({"NewFavoriteOpty":elementClicked.getAttribute("value")});
            }
            
            createEvent.fire();
        }
    }
})