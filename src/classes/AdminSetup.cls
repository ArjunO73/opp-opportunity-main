public class AdminSetup {

    @AuraEnabled
    public static Admin upsertConfig(String adminConfig){
        AdminSetupHandler adminSetupHandler = new AdminSetupHandler();
        System.debug(adminConfig);
        Admin admin = (Admin)JSON.deserialize(adminConfig, Admin.class);
        //AdminSetupHelper adminSetupHelper = new AdminSetupHelper();
        adminSetupHandler.upsertSettings(admin);
        return admin;
    }
    
    @AuraEnabled
    public static Admin loadUserConfiguration(){
        AdminSetupHandler adminSetupHandler = new AdminSetupHandler();
        //AdminSetupHelper adminSetupHelper = new AdminSetupHelper();
        Admin ac = adminSetupHandler.findSettings();
        return ac;
    }
    
    /**@AuraEnabled
    public static List<Profile> getListOfAvailableProfiles(){
        List<Profile> profileList = [SELECT Id, Name FROM Profile];
        return profileList;
    }
    
    @AuraEnabled
    public static AdminConfig getAdminSetup(){
        AdminConfigMDT acMDT = new AdminConfigMDT();
        Profile userProfile = [select Id,Name from Profile where Id = :userinfo.getProfileId()];
        AdminConfig admingConfig =acMDT.getProfileConfiguration(userProfile.Name);
        return admingConfig;
    }
    
    @AuraEnabled
    public static AdminConfig getProfileConfig(String profileId){
        Profile userProfile = [select Id,Name from Profile where Id = :profileId];
        AdminConfigMDT acMDT = new AdminConfigMDT();
        AdminConfig adminConfig =acMDT.getProfileConfiguration(userProfile.Name);
        return adminConfig;
    }

    @AuraEnabled
    public static void updateUserPreferences(String profileId, String adminConfig){
		System.debug(profileId);//setProfileConfiguration
        Profile userProfile = [select Id,Name from Profile where Id = :profileId];
        system.debug(userProfile.Name);
        AdminConfigMDT acMDT = new AdminConfigMDT();
        acMDT.setProfileConfiguration(userProfile.Name, adminConfig);  
    }**/
    
}