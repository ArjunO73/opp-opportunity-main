({
	AddItem  : function(component, event, helper) {
		var newItem = { 
            'Quantity': 0,
            'OpportunityId': component.get("v.OppId")
        };
        var items = component.get("v.items");
        items.push(newItem);
        component.set("v.items", items);
	}
})