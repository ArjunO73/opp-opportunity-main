({
    NextStep: function (component, event, helper) {
        component.set("v.SaveMode", true);
    },
    UpdateCount: function (component, event, helper){
        var selectedItems = component.get("v.items");
        var i = 0;
        if(typeof(selectedItems) != "undefined" && selectedItems != "")
        {
            
            for(var l = 0;l<selectedItems.length;l++){
                
                if(selectedItems[l].Id == null || typeof(selectedItems[l].Id) == "undefined")
                {
                    i++;
                }
            }
        }
        
        component.set("v.SelectedItemCount",i);
    },
    RemoveItem: function(component, event, helper){
        var ProductToRemove = event.target.id;
        var selectedItems = component.get("v.items");
        for(var l = 0;l<selectedItems.length;l++){
            
            if(selectedItems[l].PricebookEntry.Product2.Id == ProductToRemove)
            {
                selectedItems.splice(l,1);
                l--;
            }
        }
        component.set("v.items",selectedItems);
        var ProductSelectInputs = component.find("ProductSelect");
        if(typeof(ProductSelectInputs) != "undefined" && ProductSelectInputs != "")
        {
            for(var p = 0;p<ProductSelectInputs.length;p++){
                if(ProductToRemove == ProductSelectInputs[p].getElement().value && ProductSelectInputs[p].getElement().checked)
                {
                    ProductSelectInputs[p].getElement().checked = false;
                }
            }
        }
        
    },
    ApplyFilter: function (component, event, helper){
        var listofrecordstofilter = component.find("ProductRecord");
        var searchstring = event.srcElement.value;
        for(var i = 0; i<listofrecordstofilter.length;i++)
        {
            if(listofrecordstofilter[i].getElement().title.indexOf(searchstring) < 0){
                listofrecordstofilter[i].getElement().style.display = "none"; 
            }
            else{
                listofrecordstofilter[i].getElement().style.display = ""; 
            }
        }
    },
    SaveChanges: function(component, event, helper){
        component.set("v.AddNewMode", false);
        component.set("v.SaveMode", false);
    },
    CancelAddNew: function (component, event, helper){
        var selectedItems = component.get("v.items");
        for(var l = 0;l<selectedItems.length;l++){
            
            if(selectedItems[l].Id == null || typeof(selectedItems[l].Id) == "undefined")
            {
                selectedItems.splice(l,1);
                l--;
            }
        }
        component.set("v.items",selectedItems);
        component.set("v.SaveMode", false);
        component.set("v.AddNewMode", false);
    },
    SelectProduct: function (component, event, helper) {
        var elementclicked = event.srcElement;
        if (elementclicked != null && typeof(elementclicked) != "undefined") {
            var inputclicked = elementclicked.control;
            if (inputclicked != null && typeof(inputclicked) != "undefined") {
                if(inputclicked.checked){
                    var selectedItems = component.get("v.items");
                    var RemovedId = inputclicked.value;
                    for(var l = 0;l<selectedItems.length;l++){
                        if(RemovedId == selectedItems[l].PricebookEntry.Product2.Id)
                        {
                            if(selectedItems[l].Id == null || typeof(selectedItems[l]) == "undefined")
                            {
                                selectedItems.splice(l,1);
                                component.set("v.items",selectedItems);
                                l--;
                            }
                            
                        }
                    }
                }
                else{
                    var attributelist = inputclicked.attributes;
                    for (var i = 0; i < attributelist.length; i++) {
                        var attribute = attributelist[i];
                        if (attribute.name == "id") {
                            var selectedId = attribute.value;
                            var tempSelectedItem = {
                                'Quantity':1
                            };
                            var allentries = component.get("v.Products");
                            for(var k=0;k<allentries.length;k++){
                                if(selectedId == allentries[k].Id){
                                    var tempSelectedIteminLoop = allentries[k];
                                    tempSelectedItem.OpportunityId = component.get("v.OppId");
                                    
                                    tempSelectedItem.PricebookEntryId = tempSelectedIteminLoop.Id;
                                    tempSelectedItem.PricebookEntry = tempSelectedIteminLoop;
                                    tempSelectedItem.UnitPrice = tempSelectedIteminLoop.UnitPrice;
                                    tempSelectedItem.Name = tempSelectedIteminLoop.Name;
                                }
                            }
                            var selectedItems = component.get("v.items");
                            selectedItems.push(tempSelectedItem);
                            component.set("v.items",selectedItems);
                        }
                    }
                }
                
            }
        }
    }
})