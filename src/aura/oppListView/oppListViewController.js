({
    "HandleEditOpty":function(component, event, helper) {
        component.set("v.EditOpty",event.getParam("EditOpty"));
        component.set("v.EditOptyType",event.getParam("EditOptyType"));
        if(event.getParam("EditOptyType") == "NewOptyProduct"){
            component.set("v.ShowFastOptyLineItemOverLay","ReadyToShow");
        } else {
            component.set("v.ShowEditOpty","ShowEditOptyOverlay");   
        }
    },
    "handlenavigation":function(component, event, helper){
        console.log("handler success toast");
    },
    "handleMenuSelect":function(cmp, e) {
        var selectedMenuItemValue = e.getParam("value");
        if(selectedMenuItemValue == "NewOpty"){
            cmp.set("v.ShowNewOpty","Show");
        } else if(selectedMenuItemValue == "AddActivity"){
            var createRecordEvent = $A.get("e.force:createRecord");
            createRecordEvent.setParams({
                "entityApiName": "Task",
                "navigationLocation":"LOOKUP",
                "panelOnCreateCallback":function(event){
                    console.log(event);
                }
            });
            createRecordEvent.fire();
        }else if(selectedMenuItemValue == "AddProduct"){
                if(cmp.get("v.ShowFastOptyLineItemOverLay") == "ReadyToShow")
                    cmp.set("v.ShowFastOptyLineItemOverLay","show");
        }
    }
})