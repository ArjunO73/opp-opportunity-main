({
	getOppty1 : function(component, Optyload) {
		var opptyAction1 = component.get("c.getSelectedOppty");
        opptyAction1.setParams({
            "opptyId": Optyload
        });
        opptyAction1.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
 				var oL=response.getReturnValue();
                component.set("v.oppty",oL[0]);
            }                 
            else {
                var toastEvent = $A.get("e.force:showToast");
        		toastEvent.setParams({
            	"title": "Error!",
            	"message": "Error in getting Opportunity data",
            	"type": "error"
       			 });
        		toastEvent.fire();
                
            }
        });
        $A.enqueueAction(opptyAction1);
	},
    
    getNotes1 : function(component, Optyload) {
		var noteAction1 = component.get("c.getData");
        noteAction1.setParams({
            "opptyId": Optyload
        });
        noteAction1.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
 				var L1=response.getReturnValue();
                component.set("v.myNotesList",L1);
                component.set("v.myNotes",L1[0]);
            }                 
            else {
                var toastEvent = $A.get("e.force:showToast");
        		toastEvent.setParams({
            	"title": "Error!",
            	"message": "Error in getting Notes data " +response.getState(),
            	"type": "error"
       			 });
        		toastEvent.fire();
            }
        });
        $A.enqueueAction(noteAction1);
	},
    
    setNotes : function(component, Optyload) {
     var saveAction = component.get("c.saveData");
    	saveAction.setParams({
            "nObj":component.get("v.myNotes"),
            "notesBody":component.find("txtNotes").get("v.value"),
            "opptyId": Optyload
        });
        saveAction.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
 				console.log("done");
                console.log(component.find("txtNotes").get("v.value"));
                console.log(Optyload);
                
                var toastEvent = $A.get("e.force:showToast");
        		toastEvent.setParams({
            	"title": "Success!",
            	"message": "Notes Saved to the Selected Opportunity!",
            	"type": "success"
       			 });
        		toastEvent.fire();
                /*component.set("v.btnDisable","true");*/
            }                 
            else {
                 var toastEvent = $A.get("e.force:showToast");
        		toastEvent.setParams({
            	"title": "Error!",
            	"message": "Error while saving Notes data " +response.getState(),
            	"type": "error"
       			 });
        		toastEvent.fire();
                }
        });
        $A.enqueueAction(saveAction);
    }   
})