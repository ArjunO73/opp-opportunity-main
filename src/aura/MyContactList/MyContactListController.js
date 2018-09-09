({
    onCalendarRender:function(cmp, evt) {
        if(evt.getParam("message") == 'CalendarLoaded' || cmp.get("v.associateDragAfterEdit") == 'Y')
        {            
            console.log("onRender");
            $('.row1').draggable({
                appendTo :"body",
                helper: "clone",
                zIndex: 10000,
                start: function( event, ui ) {
                    console.log("Drag Start");
                    $(ui.helper).css('width', "10%");
                },
                create: function( event, ui ) {
                    console.log("Drag Created");
                    //$(ui.helper).css('width', "10%");
                }
            });
        }
    },    
	myAction : function(component, event, helper) 
    {
        console.log("My Contact List initialised");
        if(event.getParam("arguments") != undefined)
        {   
            var action = component.get("c.getContacts");
            var filterlabel =event.getParam("FilterLabel")?event.getParam("FilterLabel"):component.get("v.filterlabel");
            if(filterlabel != ''){
                component.set("v.filterlabel",filterlabel);
            }
            var filtername =component.get("v.FilterName");//event.getParam("ContactListFilter")?event.getParam("ContactListFilter"):component.get("v.FilterName");
            action.setParams({
                RecType : filtername
            });            
            action.setCallback(this, function(data) {
                component.set("v.Contacts", data.getReturnValue());
                //$A.get('e.force:refreshView').fire();
            });
            $A.enqueueAction(action); 
        }
        else
        {
            var action = component.get("c.getContacts");
            var filterlabel =event.getParam("FilterLabel")?event.getParam("FilterLabel"):component.get("v.filterlabel");
            if(filterlabel != ''){
                component.set("v.filterlabel",filterlabel);
            }
            var filtername =event.getParam("ContactListFilter")?event.getParam("ContactListFilter"):component.get("v.FilterName");
            action.setParams({
                RecType : filtername
            });
            action.setCallback(this, function(data) {
                component.set("v.Contacts", data.getReturnValue());
                component.set("v.recordId", data.getReturnValue()[0]["Id"]);
                component.set("v.transformIndex", 0);
                component.set("v.disableAttrNext",false);
            });
            $A.enqueueAction(action);
            if(filtername != component.get("v.FilterName"))
            {
                component.set("v.FilterName",filtername);
                component.set("v.associateDragAfterEdit","Y"); 
                $A.enqueueAction(component.get('c.onCalendarRender'));
                $(".slds-carousel__panels").attr("style","transform:translateX(-0%)");
            }
        }
	},
    previousRecord : function(component, event, helper) {
        console.log("previous");
        if(component.get("v.transformIndex") == 0)
            component.set("v.disableAttrPrev",true);
            //$("#"+component.get("v.recordId")).parents(".slds-carousel__panels").attr("style","transform:translateX(-"+0+"%)");
        else
        {
            component.set("v.disableAttrNext",false);
            var a = component.get("v.transformIndex");
            a = (a-1)*100;
            var b = a/100;
            component.set("v.transformIndex", b);
            $("#"+component.get("v.recordId")).parents(".slds-carousel__panels").attr("style","transform:translateX(-"+a+"%)");
        }            
    },
    nextRecord : function(component, event, helper) {
        console.log("next");
        if(component.get("v.transformIndex") == Math.floor((component.get("v.Contacts").length-1)/3))
            component.set("v.disableAttrNext",true);
           	//$("#"+component.get("v.recordId")).parents(".slds-carousel__panels").attr("style","transform:translateX(-"+component.get("v.transformIndex")+"%)");
		else
        {
            component.set("v.disableAttrPrev",false);
            var a = component.get("v.transformIndex");
            a = (a+1)*100;
            var b = a/100;
            component.set("v.transformIndex", b);
            $("#"+component.get("v.recordId")).parents(".slds-carousel__panels").attr("style","transform:translateX(-"+a+"%)");
        } 
    },
    editContact: function(component, event, helper) {
    	console.log("EditContact");
        var editRecordEvent = $A.get("e.force:editRecord");
            editRecordEvent.setParams({
            "recordId": event.currentTarget.id,
        });
        component.set("v.recordId", event.currentTarget.id);
        component.set("v.associateDragAfterEdit","Y");        
        editRecordEvent.fire();
    }
})