({
    doInit : function(component, event, helper) {
        helper.loadSettings(component,event,helper);
    },
    loadAdminSettings: function(component, event, helper) {
        helper.loadSettings(component, event, helper);
    },
    saveSettings: function(component, event, helper){
        helper.saveSettingsHelper(component, event);
    },
    cancel: function(component, event, helper){
		alert('cancel');
    }
})