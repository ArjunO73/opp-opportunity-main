({
	
    handleShowModal : function (component, event, helper) {
        var modalBody;
        console.log("fromshowmodel"),
        $A.createComponents([
            ["c:testmodal",{}]
        ],
                            function(components, status){
                                if (status === "SUCCESS") {
                                    modalBody = components[0];
                                    console.log("from function"),
                                    console.log(modalBody),
                                    component.find('overlayLib').showCustomModal({
                                        header: "Add Notes",
                                        body: modalBody, 
                                        showCloseButton: true,
                                        cssClass: "my-modal,my-custom-class,my-other-class",
                                        closeCallback: function() {
                                            
                                        }
                                    });
                                }
                            }
                           );
    }

 })