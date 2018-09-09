({
    sendToVF : function(component, helper) {
        //Prepare message in the format required in VF page
        var message = {
			            "loadGoogleMap" : true,
            			"mapData": component.get('v.mapData'), 
            			"mapOptions": component.get('v.mapOptions'),  
                       	'mapOptionsCenter': component.get('v.mapOptionsCenter'),
            			'location':component.get('v.location')
        		} ;
        
        //Send message to VF
        helper.sendMessage(component, helper, message);
    },
    sendMessage: function(component, helper, message){
        //Send message to VF
        var count =0;
        message.origin = window.location.hostname;
        if(count ==0)
        {
            var vfWindow = component.find("vfFrame").getElement().contentWindow;
            count++;
        }
        vfWindow.postMessage(message, component.get("v.vfHost"));
    }
})