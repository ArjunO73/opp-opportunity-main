({
    doInit : function(component, event, helper) {
        helper.loadAllProfiles(component,event,helper);
    },
    loadAdminSettings: function(component, event, helper) {
        helper.loadCustomSettings(component, event, helper);
    },
    saveSettings: function(component, event, helper){
        helper.saveSettingsHelper(component, event);
    },
    saveAlerts: function(component, event, helper){
        helper.saveAlertsHelper(component, event);
    },
    saveCalendarView: function(component, event, helper){
        helper.saveCalendarHelper(component, event);
    },
    saveContacts: function(component, event, helper){
        helper.saveContactsHelper(component, event);
    },
    cancel: function(component, event, helper){
        helper.cancelSettingsHelper(component, event);
    }
})