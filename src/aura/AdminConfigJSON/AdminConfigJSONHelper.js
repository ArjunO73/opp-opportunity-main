({
    loadSettings : function(component,event,helper) {
        var action = component.get("c.loadUserConfiguration");
        action.setCallback(this, function(response) {
            //store response state 
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.admin", response.getReturnValue());
            }
        });
        // enqueue the Action   
        $A.enqueueAction(action);
    },
    saveSettingsHelper : function(component, event){
        var action = component.get("c.upsertConfig");
        var admin = component.get("v.admin");
        action.setParams({
            "adminConfig":JSON.stringify(admin)
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been updated successfully."
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
    showToastMessage : function(component, event){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully."
        });
        toastEvent.fire();
    }
})