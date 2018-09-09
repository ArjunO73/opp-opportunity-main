({
	
    handleApplicationEventFire : function(cmp, event) {
        var context = event.getParam("context");
        //alert(cmp.get("v.obj"));
        /*var action = cmp.get("v.obj");
        action.setCallback(this, function(a){
            cmp.set("v.obj", a.getReturnValue()+context);
        });
        $A.enqueueAction(action);*/
        var check=cmp.get("v.obj");
        check=JSON.parse(JSON.stringify(check));
        check.push("Most recent event handled: APPLICATION event, from " + context);
        //alert(check);
        cmp.set("v.obj", check);
    },
    handleShowActiveSectionName : function(component, event, helper) {
		alert(component.find("accordion").get('v.activeSectionName'));
	},
    handleSetActiveSectionC:function(component, event, helper){
    
	},
    handleSelect: function (cmp, event) {
        // This will contain the index (position) of the selected lightning:menuItem
        var selectedMenuItemValue = event.getParam("value");
        // Find all menu items
        var menuItems = cmp.find("menu");
        // Get the selected menu item
        var menuItem = menuItems.find(function(menuItem) {
            return menuItem.get("v.value") === selectedMenuItemValue;
        });
        //alert(!menuItem.get("v.checked")+menuItem.get("v.value"));
        // Toggle the existing checked value, if it was true, it will be set to false, and vice-versa
        cmp.set('v.'+menuItem.get("v.value"), !menuItem.get("v.checked"));
        menuItem.set("v.checked", !menuItem.get("v.checked"));
    },
    sectionOne : function(component, event, helper) {
       helper.helperFun(component,event,'articleOne');
    },
    sectionTwo : function(component, event, helper) {
       helper.helperFun(component,event,'articleTwo');
    },
    sectionThree :function(component, event, helper) {
       helper.helperFun(component,event,'articleThree');
    },
    doInit : function(component, event, helper){
        helper.fillAllTasks(component);
    }
})