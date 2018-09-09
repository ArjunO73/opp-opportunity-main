({
    /*init: function(cmp, evt, hlp) {
        var myPageRef = cmp.get("v.pageReference");
        var ShowNewOpty = myPageRef && myPageRef.state ? myPageRef.state.ShowNewOpty : "Hide";
        cmp.set("v.ShowNewOpty", ShowNewOpty);
    },*/
	NewOpty : function(component, event, helper) {
        component.getElement().classList.remove("Show");
	},
    SaveEditOpty: function(c,e,h){
       /*c.getElement().classList.remove("Show");
        c.getElement().classList.add("Hide");*/
        c.set("v.ShowNewOpty", "Hide");
//        c.set("v.RecordId","");
        $A.get('e.force:refreshView').fire();
    },
    CancelEditOpty: function(c,e,h){
        c.set("v.ShowNewOpty", "Hide");
        /*c.getElement().classList.remove("Show");
        c.getElement().classList.add("Hide");*/
    }
})