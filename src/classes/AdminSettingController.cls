public class AdminSettingController {
    
    @AuraEnabled
    public static List<Profile> getListOfAvailableProfiles(){
        List<Profile> profileList = [SELECT Id, Name FROM Profile];
        return profileList;
    }
    
    @AuraEnabled
    public static Admin loadUserConfiguration(){
        AdminSetupHandler adminSetupHandler = new AdminSetupHandler();
        //AdminSetupHelper adminSetupHelper = new AdminSetupHelper();
        Admin ac = adminSetupHandler.findSettings();
        return ac;
    }
    
    @AuraEnabled
    public static Admin_Setup__c getCustomSettingForProfile(String profileId){
        Admin_Setup__c adminSetup = Admin_Setup__c.getInstance(profileId);
        return adminSetup;
    }
    
    @AuraEnabled
    public static Admin_Setup__c getAdminSetup(){
        Admin_Setup__c adminSetup = Admin_Setup__c.getInstance(userinfo.getProfileId());
        return adminSetup;
    }
    
    @AuraEnabled
    public static void updateUserPreferences(String profileId, Boolean V1, Boolean V2, Boolean V3, Boolean V4, String Scenario){
        Admin_Setup__c adminSetup = Admin_Setup__c.getInstance(profileId);
        if(adminSetup == null){
            adminSetup = new Admin_Setup__c();
        }
        system.debug(adminSetup);
        adminSetup.SetupOwnerId = profileId;
        if(Scenario == 'Tile'){
            adminSetup.List_View__c = V1;
            adminSetup.Alerts__c = V2;
            adminSetup.Contacts__c = V3;
            adminSetup.Calendar__c = V4;
        }
        else if(Scenario == 'Opty List'){
            adminSetup.List_View__c = V1;
            adminSetup.Alerts__c = V2;
            adminSetup.Contacts__c = V3;
            adminSetup.Calendar__c = V4;
        }

        update adminSetup;
    }
    
     @AuraEnabled
    public static void updateOptyTilePreferences(String profileId, Boolean V1, Boolean V2, Boolean V3, Boolean V4, Boolean V5, Integer V6, String Scenario){
        Admin_Setup__c adminSetup = Admin_Setup__c.getInstance(profileId);
        if(adminSetup == null){
            adminSetup = new Admin_Setup__c();
        }
        system.debug(V1);
        adminSetup.SetupOwnerId = profileId;
        if(Scenario == 'Opty List'){
            adminSetup.OptySearch__c = V1;
            adminSetup.Opty_Record_Inline_Menu__c = V2;
            adminSetup.Opty_Quick_Edit__c = V3;
            adminSetup.Opty_Sync__c = V4;
            adminSetup.New_Opty_Task__c = V5;
            adminSetup.Opty_Record_count__c = V6;
        }
		
        update adminSetup;
    }
    
    @AuraEnabled
    public static void updateAlerts(String profileId, Boolean closeDate, Boolean notes, Boolean sales, Boolean updateAlerts){
        Alerts__c alerts = Alerts__c.getInstance(profileId);
        if(alerts == null){
            alerts = new Alerts__c();
        }
        alerts.Close_Date__c = closeDate;
        alerts.Notes__c = notes;
        alerts.Sales__c = sales;
        alerts.Update_Alerts__c = updateAlerts;
        update alerts;
    }
    
    @AuraEnabled
    public static void updateCalendarSettings(String profileId, Boolean dayListView, Boolean dayView, Boolean monthView, Boolean monthListView, Boolean weekView){
        Calendar_View__c calendarView = Calendar_View__c.getInstance(profileId);
        if(calendarView == null){
            calendarView = new Calendar_View__c();
        }
        calendarView.Day_List_View__c = dayListView;
        calendarView.Day_View__c = dayView;
        calendarView.Month_View__c = monthView;
        calendarView.Week_List_View__c = monthListView;
        calendarView.Week_View__c = weekView;
        update calendarView;
    }
    
	@AuraEnabled
    public static void updateContactSettings(String profileId, Boolean allContacts, Boolean myContacts){
        Contact_View__c contactView = Contact_View__c.getInstance(profileId);
        if(contactView == null){
            contactView = new Contact_View__c();
        }
        contactView.All_Contacts__c = allContacts;
        contactView.My_Contacts__c = myContacts;
        update contactView;
    }
    
}