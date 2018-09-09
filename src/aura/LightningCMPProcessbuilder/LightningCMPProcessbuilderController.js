({
	LoadFirstStep : function(component, event, helper) {
		var TotalSteps = component.get("v.StepListTemp").length;
        if(TotalSteps > 0){
            component.set("v.StepList",component.get("v.StepListTemp"));
            component.set("v.activeStep","Step0");
        }
	},
    FinishSyncProcess:function(component, event, helper){
        if(event.getParam("ProcessComplete") == "Success")
        {
             component.set("v.ShowSyncOptyProcess","Hide");
       		 component.set("v.ResetSynProcess","Reset");
        }
        else if(event.getParam("ProcessComplete") == "Cancel"){
            component.set("v.ShowSyncOptyProcess","Hide");
            component.set("v.ResetSynProcess","Reset");
        }
    },
    CancelProcess: function(c,e,h){
		/*c.getElement().classList.remove("Show");
        c.getElement().classList.add("Hide");*/
        c.set("v.ShowSyncOptyProcess","Hide");
        c.set("v.ResetSynProcess","Reset");
    },
    NextStep : function(c,e,h){
        var stepaction = e.getParam("ProcessStepChange");
        if(stepaction == "NextStep"){
            var stepcontainer = c.find("StepContainer");
            var steps = stepcontainer.getElement().children;
            for (var i=0;i<steps.length;i++){
                if(steps[i].className.indexOf( c.get("v.activeStep")) > -1){
                    if(i+1 == steps.length-1){
                        c.set("v.NextButton","HideNext");
                        c.set("v.FinishButton","ShowFinish");
                        steps[i].classList.remove("ShowStep");
                        steps[i].className +=  " HideStep";
                        i++;
                        steps[i].classList.remove("HideStep");
                        steps[i].className +=  " ShowStep";
                        c.set("v.activeStep",steps[i].className);
                    }
                    else if(steps[i].className.indexOf("ShowStep")){
                        steps[i].classList.remove("ShowStep");
                        steps[i].className +=  " HideStep";
                        i++;
                        steps[i].classList.remove("HideStep");
                        steps[i].className +=  " ShowStep";
                        c.set("v.activeStep",steps[i].className);
                        break;
                    }
                }
            }
        }
    }
})