({
    helperFun : function(component,event,secId) {
        var acc = component.find(secId);
        for(var cmp in acc) {
            $A.util.toggleClass(acc[cmp], 'slds-show');  
            $A.util.toggleClass(acc[cmp], 'slds-hide');  
        }
    },
    fillAllTasks : function(component, event, helper) {
        var action = component.get("c.filltasks");
        action.setParams({
            "g":component.get("v.temp")?component.get("v.temp"):7,
        });
        action.setCallback(this, function(a){
            var storage=a.getReturnValue();
            component.set("v.obj",this.objmodifier(this.addurltosales(storage['oppsales'],storage['oppurls']),'CreatedDate'));
            console.log(storage);
            component.set("v.objclosedate",storage['oppclosedate']);
            component.set("v.objnotes",this.objmodifier(storage['oppnotes'],'CreatedDate'));
        });
        $A.enqueueAction(action);
    },
    objmodifier:function(object,s){
    for (var i=0;i<object.length;i++){
        //console.log(object[i][s],'test',object[i][s].split('T'));
    object[i][s]=object[i][s].split('T')[0];
        
}
 return object;
},
    addurltosales:function(obj1,obj2){
    for (var i=0;i<obj1.length;i++){
    for(var j=0;j<obj2.length;j++){
    	for(var k in obj2[j]){
            //console.log('str',k,'ddd',String(obj1[i]['Id']));
    		if(k==String(obj1[i]['CreatedById'])){
                var temp=obj2[j][k].split(',')
    			obj1[i]['photourl']=temp[0];
                obj1[i]['username']=temp[1];
                obj1[i]['userid']=k;
                }
            }
        }
           
    }
 return obj1;
    
}
})