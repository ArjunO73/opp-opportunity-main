({
     hideModal : function(component, event, helper) {
    	var modal = component.find("mapsModal");
        //$A.util.removeClass(modal, 'hideDiv');
        component.set("v.showMaps", false); 
    },
	showModal : function(component, event, helper) {
        var modal = component.find("mapsModal");
        $A.util.addClass(modal, 'hideDiv');
    },
	doInit2 : function(component, event, helper) {
	    //Send LC Host as parameter to VF page so VF page can send message to LC; make it all dynamic
        component.set('v.lcHost', window.location.hostname);
		console.log(event.getParam("arguments"));
        var params = event.getParam('arguments');
        if (params) {
            var param1 = params.mapOptionsCenter;
            var param2 = params.mapData;
            var param3 = params.location;
            console.log("DOINIT2..");
            component.set('v.mapOptionsCenter', param1);
            component.set('v.location', param3);
        }

  		//Add message listener
        window.addEventListener("message", function(event) {
            //Can enable origin control for more security
            /*if (event.origin != vfOrigin) {
                console.log('Wrong Origin');
                return;
            }*/
            
            // Handle the message
            if(event.data.state == 'LOADED'){
                //Set vfHost which will be used later to send message
                component.set('v.vfHost', event.data.vfHost);
                
                //Send data to VF page to draw map
                helper.sendToVF(component, helper);
            }
        }, false);
	}
})