public class AdminConfigHelper {

    public static void addMetaData(String profileId, String metaJSON){
        
    }
    
    public static void setMetaData(String profileId, String metaJSON){
        
    }
    
    public static void getMetaData(){
        Profile userProfile = [select Id,Name from Profile where Id = :userinfo.getProfileId()];
		getMetaData(userProfile.Name);
    }
    
    public static String getMetaData(String profileName){
        List<Admin_Configurations__c> acList = [select Id, Name from Admin_Configurations__c where Name = :profileName];
        String userMetaJSON = null;
        if(!acList.isEmpty()){
            Admin_Configurations__c adminConfig = acList[0];
            //(AdminConfig)JSON.deserialize()
        	userMetaJSON = getJSON(profileName, adminConfig.Id);
        } 
        return userMetaJSON;
    }
    
    private static String getJSON(String profileName, Id parentId){
        Attachment jsonAttachment = [select id, body from attachment where name = :profileName and parentID = :parentId];
        if(jsonAttachment != null && jsonAttachment.body != null){
            return jsonAttachment.body.toString();
        } else {
            return null;
        }
    }
    
}