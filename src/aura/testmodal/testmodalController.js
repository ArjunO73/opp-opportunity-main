({
	dataLoad : function(component, event, helper) {
        /*helper.getOppty(component, event, helper);
        helper.getNotes(component, event, helper);*/
        var Opty=event.getParam("Opty");
        helper.getOppty1(component, Opty);
        helper.getNotes1(component, Opty);
   	},
    
    handleEvent : function(component, event, helper) {
        var Opty=event.getParam("Opty");
        /*component.set("v.btnDisable","false");*/
        helper.getOppty1(component, Opty);
        helper.getNotes1(component, Opty);
        
   	},
    
     setData : function(component, event, helper) {
       	 var Opty=component.get("v.oppty.Id");
         helper.setNotes(component,Opty);
	},
    
     handleCancel : function(component, event, helper) {
        //closes the modal or popover from the component
        component.find("overlayLib").notifyClose();
     }
 })