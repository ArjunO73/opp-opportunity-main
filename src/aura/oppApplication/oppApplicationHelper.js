({
    loadAdminSettings : function(component, event) {
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
    }
})