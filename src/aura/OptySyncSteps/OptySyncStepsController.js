({
	LoadFirstStep : function(component, event, helper) {
		var TotalSteps = component.get("v.StepListTemp").length;
        if(TotalSteps > 0){
            component.set("v.StepList",component.get("v.StepListTemp"));
            component.set("v.activeStep","Step0");
            
            var action = component.get("c.getFieldsListMap");
            action.setParams({ObjectName:'Opportunity'});
			action.setCallback(this, function(response) {
                var Fields = response.getReturnValue();
                var FieldsList = [];
                for(var key in Fields){
                    FieldsList.push({value:Fields[key], key:key}); //Here we are creating the list to show on UI.
                }
                component.set("v.FieldsList",FieldsList);
            });
            $A.enqueueAction(action);
            
            var actionRelatedList = component.get("c.getChildRelationShipList");
            actionRelatedList.setParams({ObjName:'Opportunity',RelatedListNames:['OpportunityLineItem','ActivityHistory']});
			actionRelatedList.setCallback(this, function(response) {
                var RelatedList = response.getReturnValue();
                var temp = [];
                for (var p=0;p<RelatedList.length;p++){
                    temp[p] = JSON.parse(RelatedList[p]);
                }
                component.set("v.RelatedListNames",temp);
                console.log(component.get("v.RelatedListNames"));
            });
            $A.enqueueAction(actionRelatedList);
        }
	},
    ResetProcess : function(c,e,h){
        var newValue = e.getParam("value");
        if(newValue == "Reset"){
            c.set("v.activeStep","Step0");
            var stepcontainer = c.find("StepContainer");
            var steps = stepcontainer.getElement().children;
            for (var i=0;i<steps.length;i++){
                c.set("v.NextButton","ShowNext");
                c.set("v.FinishButton","HideFinish");
                if(i==0)
                {
                    steps[i].classList.remove("HideStep");
                    steps[i].className +=  " ShowStep";
                    c.set("v.activeStep",steps[i].className);
                }
                else{
                    steps[i].classList.remove("ShowStep");
                    steps[i].className +=  " HideStep";
                }
            }
            c.set("v.ProcessPercentageCompletion",0);
            c.set("v.activeStepIndex",0);
            c.set("v.ResetSynProcess","Complete");
        }
        
    },
    handleRecordLoad:function(c, e, h){
        var eventParams = e.getParams();
        if (eventParams.changeType === "LOADED"){
            var recordset = c.get("v.RecordToSync");
            var relatedListToSync = c.get("v.RecordListstosync");
            var FieldsRetrieved = Object.keys(recordset);
            var recordsetString = "";
            for(var index = 0;index<FieldsRetrieved.length;index++){
                if(index == 0){
                    recordsetString = '{"'+FieldsRetrieved[index]+'":"'+recordset[FieldsRetrieved[index]]+'"';
                }
                else if(index == FieldsRetrieved.length-1){
                    recordsetString += ',"'+FieldsRetrieved[index]+'":"'+recordset[FieldsRetrieved[index]]+'"}';
                }
                else{
                    recordsetString += ',"'+FieldsRetrieved[index]+'":"'+recordset[FieldsRetrieved[index]]+'"';
                }
            }
            var action = c.get("c.SyncData");
            action.setParams({'RecordId':c.get("v.OptyToSync"),'targetURL':c.get("v.targetURL"),'datatosync':recordsetString,'ListsToSync':relatedListToSync});
            action.setCallback(this, function(response) {
                var EventNextClick = c.getEvent("FinishSyncProcess");
                EventNextClick.setParams({"ProcessComplete":"Success"});
                EventNextClick.fire();
            });
            $A.enqueueAction(action);
        }
    },
    NextStep : function(c,e,h){
        var stepaction = e.getParam("ProcessStepChange");
        if(stepaction == "FinishProcess"){
           
            c.find("recordLoader").reloadRecord();
            
        }
		else if(stepaction == "CancelProcess"){
            var EventNextClick = c.getEvent("FinishSyncProcess");
            EventNextClick.setParams({"ProcessComplete":"Cancel"});
            EventNextClick.fire();
        }
        else if(stepaction == "NextStep"){
            var stepcontainer = c.find("StepContainer");
            var steps = stepcontainer.getElement().children;
            for (var i=0;i<steps.length;i++){
                if(c.get("v.activeStep").indexOf("Step0") >=0){
                    var fieldstoselect = c.find("FieldsToSelect");
                    var fieldgroup = "";
                    var checkboxes = "";
                    var checkbox = "";
                    var fieldstosync = "";
                    var fieldstosyncForRecordLoad = []; 
                    var k = 0;
                    for(var j=0;j<fieldstoselect.length;j++){
                        fieldgroup = fieldstoselect[j].getElement();
                        checkboxes = fieldgroup.children;
                        for(k=0;k<checkboxes.length;k++){
                            checkbox = checkboxes[k];
                            if(checkbox.firstChild.checked){
                                if(fieldstosync == "")
                                    fieldstosync = checkbox.firstChild.value;
                                else
                                	fieldstosync += ","+checkbox.firstChild.value;
                                fieldstosyncForRecordLoad.push(checkbox.firstChild.value);
                            }
                        }
                    }
                    if(fieldstosync != ""){
                        c.set("v.fieldstosync",fieldstosync);
                        c.set("v.fieldstosyncForRecordLoad",fieldstosyncForRecordLoad);
                        console.log(fieldstosync);
                    }
                }
                else if(c.get("v.activeStep").indexOf("Step1") >=0){
                    var RecordListstoselect = c.find("RelatedListsToSelect");
                    RecordListstoselect = RecordListstoselect.getElement().children;
                    var RecordListsgroup = "";
                    var RecordListscheckboxes = "";
                    var RecordListscheckbox = "";
                    var RecordListstosync = ""; 
                    var k = 0;
                    for(var j=0;j<RecordListstoselect.length;j++){
                        RecordListsgroup = RecordListstoselect[j];
                        checkboxes = RecordListsgroup.children;
                        for(k=0;k<checkboxes.length;k++){
                            checkbox = checkboxes[k];
                            if(checkbox.checked){
                                if(RecordListstosync == "")
                                    RecordListstosync = '["'+checkbox.value+'"';
                                else
                                	RecordListstosync += ',"'+checkbox.value+'"';
                            }
                        }
                    }
                    if(RecordListstosync != ""){
                        RecordListstosync += "]";
                        c.set("v.RecordListstosync",RecordListstosync);
                        console.log(RecordListstosync);
                    }
                }
                else if(c.get("v.activeStep").indexOf("Step2") >=0){
                    var targetURL = c.find("TargetURL").getElement().value;
                    c.set("v.targetURL",targetURL);
                }
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
                        c.set("v.ProcessPercentageCompletion",(i+1/steps.length)*100);
                        c.set("v.activeStepIndex",i);
                    }
                    else if(steps[i].className.indexOf("ShowStep")){
                        steps[i].classList.remove("ShowStep");
                        steps[i].className +=  " HideStep";
                        i++;
                        steps[i].classList.remove("HideStep");
                        steps[i].className +=  " ShowStep";
                        c.set("v.activeStep",steps[i].className);
                        c.set("v.ProcessPercentageCompletion",(i+1/steps.length)*100);
                        c.set("v.activeStepIndex",i);
                        break;
                    }
                }
                
            }
        }
    }
})