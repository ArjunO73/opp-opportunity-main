({
    init: function(c, e, h){
        /*c.find("NewActivityForm").getNewRecord("Task","",true,function(NewTaskForm){
            console.log("NewTaskCreated");
        });*/
    },
    handlenavigation:function(a,b,c,d){
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
        return false;
    },
	NewActivity: function (component, event, helper) {
		component.getElement().classList.remove("Show");
	},
	SaveEditActivity: function (c, e, h) {
		c.set("v.ShowNewActivity", "Hide");
		$A.get('e.force:refreshView').fire();
	},
	CancelEditActivity: function (c, e, h) {
		c.set("v.ShowNewActivity", "Hide");

	},
    doInit: function(component, event, helper) {
        // Prepare a new record from template
        component.find("NewActivityForm").getNewRecord(
            "Task", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.ActivityRecord");
                var error = component.get("v.error");
                if((rec === null)) {
                    console.log("Error initializing record template:"+error);
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
            })
        );
    },

    handleSaveContact: function(component, event, helper) {
        if(helper.validateContactForm(component)) {
            component.set("v.ActivityRecordFields.Id", component.get("v.recordId"));
            component.find("NewActivityForm").saveRecord(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // record is saved successfully
                    /*var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "The record was saved."
                    });
                    resultsToast.fire();*/

                } else if (saveResult.state === "INCOMPLETE") {
                    // handle the incomplete state
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    // handle the error state
                    console.log('Problem saving contact, error: ' + JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        }
    }
})