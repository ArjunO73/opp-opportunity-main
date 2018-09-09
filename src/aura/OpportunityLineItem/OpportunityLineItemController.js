/**
 * Created by cxu on 8/02/2017.
 */
({
    togglePopover : function (cmp, event, helper) {
        var editMode = cmp.get("v.editMode");
        var cmpTarget = cmp.find('popover');
        if (editMode) {
      	    $A.util.toggleClass(cmpTarget, 'hide');
      	} else {
      	    $A.util.addClass(cmpTarget, 'hide');
       }
    },
    removeItem : function (cmp, event, helper) {
        var items = cmp.get("v.items");
        for(var i=0;i<items.length;i++){
            var item = items[i];
            if(item.Id == event.srcElement.value)
            {
                 items.splice(i, 1);
            }
        }
        cmp.set("v.items",items);
    }
})