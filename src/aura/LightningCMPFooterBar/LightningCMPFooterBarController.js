({
	NextStep : function(component, event, helper) {
		var EventNextClick = component.getEvent("LightningCMPProcessBuilderNext");
        EventNextClick.setParams({"ProcessStepChange":"NextStep"});
		EventNextClick.fire();
	},
    FinishProcess:function(component, event, helper){
        var EventNextClick = component.getEvent("LightningCMPProcessBuilderNext");
        EventNextClick.setParams({"ProcessStepChange":"FinishProcess"});
		EventNextClick.fire();
    },
    StepChange:function(component, event, helper){
        var currentValue =  event.getParam("value");
        var stepcontainer = component.find("StepProgressContainer").getElement();
        var steps = stepcontainer.children;
        var step = "";
        var button = "";
        for(var i=0;i<steps.length;i++){
            step = steps[i];
            if(i<currentValue){
                button = step.firstChild;
                button.classList.add("slds-button_icon");
                button.classList.add("slds-progress__marker_icon");
                step.classList.remove("slds-is-active");
                step.classList.add("slds-is-completed");
            }
            else if(i==currentValue){
                step.classList.add("slds-is-active");
            }
        }
    },
    ResetProcess : function(component, event, helper){
        var newValue = event.getParam("value");
        if(newValue == "Reset"){
            var steps = component.find("StepProgressContainer").getElement();
            var stepClassName = "";
            var button = "";
            var step = "";
            if(typeof(steps) != "undefined" && steps != null && steps != ""){
                steps = steps.children;
                for(var i=0;i<steps.length;i++){
                    step = steps[i];
                    button = step.firstChild;
                    button.classList.remove("slds-button_icon");
                    button.classList.remove("slds-progress__marker_icon");
                    step.classList.remove("slds-is-completed");
                    step.classList.remove("slds-is-active");
                    step.classList.remove("slds-has-error");
                    if(i==0){
                        step.classList.add("slds-is-active");
                    }
                }
            }
            component.set("v.ResetSynProcess","Complete");
        }
        
    },
    ActivateFirstStep:function(component, event, helper){
        var steps = component.find("StepProgressContainer").getElement();
        var stepClassName = "";
        var button = "";
        if(typeof(steps) != "undefined" && steps != null && steps != ""){
            steps = steps.children;
            for(var i=0;i<steps.length;i++){
                button = step.firstchild;
                button.classList.remove("slds-button_icon");
                button.classList.remove("slds-progress__marker_icon");
                steps[i].classList.remove("slds-is-completed");
                steps[i].classList.remove("slds-is-active");
                steps[i].classList.remove("slds-has-error");
                if(i==0){
                    steps[i].classList.add("slds-is-active");
                }
            }
        }
        
    },
    CancelProcess:function(component, event, helper){
        var EventNextClick = component.getEvent("LightningCMPProcessBuilderNext");
        EventNextClick.setParams({"ProcessStepChange":"CancelProcess"});
        EventNextClick.fire();
    }
})