({
    loadAllProfiles : function(component,event,helper) {
        var action = component.get("c.getListOfAvailableProfiles");
        action.setCallback(this, function(response) {
            //store response state 
            var state = response.getState();
            if (state === "SUCCESS") {
                var ProfList = [];
                ProfList.push({"Id":"","Name":""});
                ProfList = ProfList.concat(response.getReturnValue());
                component.set("v.profilelist", ProfList);
            }
        });
        // enqueue the Action   
        $A.enqueueAction(action);
        this.loadAdminSettings(component, event);
    },
    loadCustomSettings : function(component,event,helper){
        var action = component.get("c.getCustomSettingForProfile");
        var selectCmp = component.find("InputSelectSingle");
        var SettingsDisplay = component.find("SettingsDisplay");
        if(typeof(selectCmp) != "undefined"){
            var ProfileId = selectCmp.get("v.value");
            if(ProfileId != "" && typeof(ProfileId) != "undefined")
            {
                action.setParams({
                    "profileId":selectCmp.get("v.value")
                });
                action.setCallback(this,function(response){
                    var state = response.getState();
                    if(state === "SUCCESS"){
                        component.set("v.adminSettings", response.getReturnValue());
                        if(typeof(SettingsDisplay) != "undefined"){
                            $A.util.removeClass(SettingsDisplay, "toggleDisplay");
                        }
                    }
                });
                $A.enqueueAction(action); 
            }
            else{
                $A.util.addClass(SettingsDisplay, "toggleDisplay")
            }
        }
        else{
             $A.util.addClass(SettingsDisplay, "toggleDisplay");
        }
        
        
    },
    saveSettingsHelper : function(component, event){
        var action = component.get("c.updateUserPreferences");
        var profileId = component.find("InputSelectSingle").get("v.value");
        /*var listView = component.find("checkbox-listview").get("v.value");
        var myAlerts = component.find("checkbox-alerts").get("v.value");
        var calendar = component.find("checkbox-calendar").get("v.value");
        var contacts = component.find("checkbox-contacts").get("v.value");*/
        var TabModified = event.getSource().get("v.title");
        if(TabModified.indexOf("Tile") >=0){
            var listView = component.find("checkbox-listview").getElement().checked;
            var myAlerts = component.find("checkbox-alerts").getElement().checked;
            var calendar = component.find("checkbox-calendar").getElement().checked;
            var contacts = component.find("checkbox-contacts").getElement().checked;
            action.setParams({
                "profileId":profileId,
                "V1" : listView,
                "V2" : myAlerts,
                "V3" : contacts,
                "V4" : calendar,
                "Scenario" :"Tile"
            });
        }
        else if(TabModified.indexOf("Opty List") >=0){
            action = component.get("c.updateOptyTilePreferences");
            var listSearch = component.find("checkbox-OptyListSearch").getElement().checked;
            var InlineMenu = component.find("checkbox-InlineMenu").getElement().checked;
            var QuickEdit = component.find("checkbox-EditOpty").getElement().checked;
            var OptySync = component.find("checkbox-SyncOpty").getElement().checked;
            var AddNewTask = component.find("checkbox-NewTask").getElement().checked;
            var NumberOfRecords = component.find("text-RecordCountDisplayed").getElement().value;
            action.setParams({
                "profileId":profileId,
                "V1":listSearch,
                "V2":InlineMenu,
                "V3":QuickEdit,
                "V4":OptySync,
                "V5":AddNewTask,
                "V6":NumberOfRecords,
                "Scenario":"Opty List"
            });
        }
        
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                alert("Success");
            }
        });
        $A.enqueueAction(action);
    },
    saveAlertsHelper : function(component, event){
        var action = component.get("c.updateAlerts");
        var profileId = component.find("InputSelectSingle").get("v.value");
        var closeDate = component.find("checkbox-close-date").get("v.value");
        var notes = component.find("checkbox-notes").get("v.value");
        var sales = component.find("checkbox-sales").get("v.value");
        var updateAlerts = component.find("checkbox-update-alerts").get("v.value");
        action.setParams({
            "profileId": profileId,
            "closeDate": closeDate,
            "notes" : notes,
            "sales" : sales,
            "updateAlerts" : updateAlerts
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                alert("Success");
            }
        });
        $A.enqueueAction(action);
    },
    saveCalendarHelper : function(component, event){
        var action = component.get("c.updateCalendarSettings");
        var profileId = component.find("InputSelectSingle").get("v.value");
        var dayListView = component.find("checkbox-day-list-view").get("v.value");
        var dayView = component.find("checkbox-day-view").get("v.value");
        var monthView = component.find("checkbox-month-view").get("v.value");
        var weekListView = component.find("checkbox-week-list-view").get("v.value");
        var weekView = component.find("checkbox-week-view").get("v.value");
        action.setParams({
            "profileId":profileId,
            "listView" : dayListView,
            "alerts" : dayView,
            "contacts" : monthView,
            "calendar" : weekListView,
            "weekView" : weekView
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                alert("Success");
            }
        });
        $A.enqueueAction(action);
    },
    saveContactsHelper : function(component, event){
        var action = component.get("c.updateContactSettings");
        var profileId = component.find("InputSelectSingle").get("v.value");
        var allContacts = component.find("checkbox-all-contacts").get("v.value");
        var myContacts = component.find("checkbox-my-contacts").get("v.value");
        action.setParams({
            "profileId":profileId,
            "listView" : allContacts,
            "alerts" : myContacts
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                alert("Success");
            }
        });
        $A.enqueueAction(action);
    },
    cancelSettingsHelper : function(component, event){
        alert("Cancel clicked");        
    },
    loadAdminSettings : function(component, event) {
        var action = component.get("c.getAdminSetup");
        action.setCallback(this, function(response) {
            //store response state 
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.adminSettings", response.getReturnValue());
            }
        });
        // enqueue the Action   
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