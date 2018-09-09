public class FillRelatedTasks {
	@AuraEnabled
    public static Map<String,List<Object>> filltasks(Integer g){
        system.debug(g);
        Map<String, List<Object>> ls = new Map<String, List<Object>>();
        //v1
        List<Opportunity> gb=Database.query('select Id,Name,CreatedDate,CreatedById from Opportunity where CreatedDate = LAST_N_DAYS:'+g+' ORDER BY LastModifiedDate DESC');
        ls.put('oppsales',gb);
        List<Map<Id, String>> usinfo = new List<Map<Id, String>>();
        for (Opportunity r : gb) {
            system.debug('edw'+r.CreatedById);system.debug('dfsf'+Userinfo.getUserid());
            //system.debug(Database.query('select Id,SmallPhotoUrl from User where Id='+r.CreatedById));
            for(User s: [select Id,SmallPhotoUrl,Name from User where Id = :r.CreatedById]){
                usinfo.add(new Map<Id, String> {s.Id=>s.SmallPhotoUrl+','+s.Name});
                //system.debug(s);
                //system.debug(s.SmallPhotoUrl);
            }
                }
        ls.put('oppurls',usinfo);
        //v1
        //v1 ls.put('oppsales',Database.query('select Id,Name,CreatedDate from Opportunity where CreatedDate = LAST_N_DAYS:'+g+' ORDER BY LastModifiedDate DESC'));
        ls.put('oppclosedate',Database.query('select Id,Name,CloseDate from Opportunity where CloseDate = NEXT_N_DAYS:'+g+' ORDER BY LastModifiedDate DESC'));
        ls.put('oppnotes',Database.query('select Id,CreatedDate from Note where ParentId in (select Id from Opportunity) and CreatedDate = LAST_N_DAYS:'+g+' ORDER BY LastModifiedDate DESC'));
        return ls;
    }
}