({
	EditOpty : function(component, event, helper) {
		component.set("v.EditOpty",event.getParams("EditOpty"));
        component.getElement().classList.remove("EditOpty");
	},
    SaveEditOpty: function(c,e,h){
        c.find("OptyRecordEditForm").get("e.recordSave").fire();
        c.set("v.ShowEditOpty","HideEditOptyOverlay");
    },
    CancelEditOpty: function(c,e,h){
        c.set("v.ShowEditOpty","HideEditOptyOverlay");
    }
})