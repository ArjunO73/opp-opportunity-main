({
    toastInfo: function(cmp,evt,hlp) {
    	
        var response = evt.getParams().type;
        var object = evt.getParams()["messageTemplateData"][0];
        if(response == "SUCCESS")
        {//var recId = evt.getParam("messageTemplateData")[1].executionComponent["attributes"].recordId;
        	//hlp.getEvents(cmp);
        	//$("#calendar").fullCalendar('removeEventSource',cmp.get('v.events'));
        	switch(object)
            {
                case "Contact":console.log("Contact Toast");
                    //$A.get('e.force:refreshView').fire();
                    var childComponent = cmp.find("contactsPanel");
        			childComponent.getContactsPanel();
                    break;
                default:
                    break;
            }
        }
        return false;
    }
})