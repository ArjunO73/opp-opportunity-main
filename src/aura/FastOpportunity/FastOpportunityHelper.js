/**
 * Created by cxu on 7/02/2017.
 */
({
    getOpportunity : function (cmp) {
        var action = cmp.get("c.getOpportunity");
        action.setParam("recordId", cmp.get("v.recordId"));

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var opportunity = response.getReturnValue();
                cmp.set("v.opportunity", opportunity);

                if (opportunity.OpportunityLineItems == null || opportunity.OpportunityLineItems == undefined) {
                    opportunity.OpportunityLineItems = [];
                	cmp.set("v.opportunity.OpportunityLineItems", opportunity.OpportunityLineItems);
                }
                this.getPricebookEntries(cmp);
                this.getPricebooks(cmp);
            }
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
    getPricebooks : function (cmp) {
         var action = cmp.get("c.getPricebooks");

         action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS") {
                 var pricebooks = response.getReturnValue();
                 cmp.set("v.pricebooks", pricebooks);
                 if (pricebooks.length > 0) {
                    cmp.set("v.pricebookId", pricebooks[0].Id);
                     if(pricebooks.length == 1 && (typeof(cmp.get("v.opportunity").Pricebook2Id) == "undefined" || cmp.get("v.opportunity").Pricebook2Id == "")){
                         this.updatePriceBook(cmp,event);
                     }
                 }
             }
             else if (state === "INCOMPLETE") {
             }
                 else if (state === "ERROR") {
                     var errors = response.getError();
                     if (errors) {
                         if (errors[0] && errors[0].message) {
                             console.log("Error message: " +
                                         errors[0].message);
                         }
                     } else {
                         console.log("Unknown error");
                     }
                 }
         });
         $A.enqueueAction(action);
     },
    updatePriceBook : function (cmp,event){
        var opportunity = cmp.get("v.opportunity");
        var pricebookId = cmp.get("v.pricebookId");
        opportunity.Pricebook2Id = pricebookId;
        opportunity.sobjectType = 'Opportunity';
        console.log(opportunity);

        var action = cmp.get("c.updateOpportunity");
        action.setParams ({
            opportunity : opportunity,
            pricebookId : pricebookId
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var error = response.getReturnValue();
                console.log(error);

                //$A.get('e.force:refreshView').fire();
                cmp.set("v.opportunity", opportunity);
                this.getOpportunity(cmp);
            }
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
     getPricebookEntries : function (cmp) {
         var pricebookId = cmp.get("v.opportunity").Pricebook2Id;

        var action = cmp.get("c.getPricebookEntries");
        action.setParam("pricebookId", pricebookId);

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var entries = response.getReturnValue();
                cmp.set("v.pricebookEntries", entries);
            }
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
     }
})