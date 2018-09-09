({
    EditOpty : function(component, event, helper) {
        component.set("v.EditOpty",event.getParams("EditOpty"));
        component.getElement().classList.remove("EditOpty");
    },
    SaveEditOpty: function(c,e,h){
        c.set("v.ShowFastOptyLineItemOverLay","hide");
    },
    CancelEditOpty: function(c,e,h){
        //Invoked from Overlay close, cancel on the add product flow
        c.set("v.ShowFastOptyLineItemOverLay","hide");
    },
    ToggleOverlay: function(component,event,helper){
        if(component.get("v.ShowFastOptyLineItemOverLay") == "hide"){
            component.set("v.EditOpty","");
        }
    }
})