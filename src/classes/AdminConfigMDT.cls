public class AdminConfigMDT {

    public void getUserConfiguration(){
        
    }
    
    public AdminConfig getProfileConfiguration(String profileName){
        List<Admin_Configurations__c> adminConfigMtd = [select Id, Name, profile_name__c from Admin_Configurations__c where Name = :profileName];
        System.debug(adminConfigMtd);
        if(!adminConfigMtd.isEmpty()){
           Admin_Configurations__c ac =  adminConfigMtd[0];
            system.debug(ac.profile_name__c);
            String settingsJSON = ac.profile_name__c.unescapeJava();
            system.debug(settingsJSON);
            return (AdminConfig)JSON.deserialize(ac.profile_name__c, AdminConfig.class);
        } else {
            return getConfig();
        }
    }
    
    public void setProfileConfiguration(String profileName, String adminConfig){
        List<Admin_Configurations__c> acList = [select Id, Name, profile_name__c from Admin_Configurations__c where Name = :profileName];
        Admin_Configurations__c adminConfiguration = null;
        if(!acList.isEmpty()){
            adminConfiguration = new Admin_Configurations__c();
        }
        System.debug('ac : ' + adminConfiguration);
        if(acList.isEmpty() && String.isNotBlank(adminConfig)){
            adminConfiguration = new Admin_Configurations__c();
            System.debug(profileName);
            adminConfiguration.Name = profileName;
            adminConfiguration.profile_name__c = JSON.serialize(adminConfig).escapeJava();
            insert adminConfiguration;
        } else {
            adminConfiguration.Name = profileName;
            adminConfiguration.profile_name__c = JSON.serialize(adminConfig).escapeJava();
            update adminConfiguration;
        }
    }
    
    private static AdminConfig getConfig(){
        AdminConfig ac = new AdminConfig();
        ac.addActivity = true;
        ac.addNotes = true;
        ac.edit = true;
        ac.importProducts = true;
        ac.search = true;
        ac.favorite = true;
        ac.probabilityIcons = true;
        
        ac.products = new Adminconfig.Products();
        ac.products.searchProduct = true;
        ac.products.addProduct = true;
        ac.products.displayProduct = true;
        ac.products.editProduct = true;
        
        ac.syncProduct = new AdminConfig.SyncProduct();
        ac.syncProduct.fieldsDisplay = true;
        ac.syncProduct.relatedListDisplay = true;
        ac.syncProduct.availableTarget = true;
        ac.syncProduct.progressBar = true;
        
        return ac;
    }
    
}