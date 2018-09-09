({
	 fireEvent : function(component, event, helper) {
		var appEvent=$A.get("e.c:OANotesEvent");
        appEvent.setParams({
            "Opty":component.find("seloptid").get("v.value")
        })
        appEvent.fire();
    }
  
})