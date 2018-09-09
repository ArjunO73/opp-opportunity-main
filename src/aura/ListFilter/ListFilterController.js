({
    onSingleSelectChange: function (component, event, helper) {
        var elements = component.getElement().children;
        var Filter = event.getSource().get("v.value");
        var options = component.get("v.options");
        var FilterLabel = "";
        for (var option in options){
            if(options[option].id == Filter){
                FilterLabel = options[option].label;
            }
        }
        var createEvent = component.getEvent("OptyListFilterChange");
        createEvent.setParams({ "OptyListFilter": Filter,"FilterLabel":FilterLabel });        
        createEvent.fire();
    }
})