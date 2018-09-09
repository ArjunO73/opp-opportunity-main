public class AdminSetupHandler {

    public void upsertSettings(Admin adminConfig){
        upsertRecord(adminConfig);
    }
    
    public Admin findSettings(){
        return getAdminSettings();
    }
    
    private void upsertRecord(Admin adminConfig){
        List<Admin_Configurations__c> acList = getAdminConfiguration();
        if(!acList.isEmpty() && adminConfig != null){
            Attachment attachment = findUserAttachment(acList[0].Id);
            system.debug(adminConfig.alertsView);
            attachment.body = blob.valueof(JSON.serialize(adminConfig));
            attachment.Name = 'adminsettings.json'; 
            //attachment.ParentId = acList[0].Id;
            update attachment;
        } else if(adminConfig != null){
            Admin_Configurations__c ac = insertAdminConfiguration();
            Attachment attachment = new Attachment();
            attachment.body = blob.valueof(JSON.serialize(adminConfig));
            attachment.Name = 'adminsettings.json'; 
            attachment.ParentId = ac.Id;
            insert attachment;
        }
    }
    
    private Admin getAdminSettings(){
        Admin admin = null;
        List<Admin_Configurations__c> acList = getAdminConfiguration();
        if(!acList.isEmpty()){
            Admin_Configurations__c ac = acList[0];
            Attachment attachment = findUserAttachment(ac.Id);
            System.debug(JSON.serialize(attachment));
            if(attachment != null && String.isNotBlank(attachment.Body.toString())){
                System.debug(JSON.serialize(attachment.Body.toString()));
                admin = (Admin)JSON.deserialize(attachment.Body.toString(), Admin.class);
            } else {
                admin = getConfig();
            }
        } else {
            admin = getConfig();
        }
        return admin;
    }
    
    private Admin_Configurations__c insertAdminConfiguration(){
        Admin_Configurations__c ac = new Admin_Configurations__c(Name='owd-settings');
        insert ac;
        return ac;
    }
    
    private List<Admin_Configurations__c> getAdminConfiguration(){
        List<Admin_Configurations__c> acList = [select Id, Name from Admin_Configurations__c];
        return acList;
    }
    
    private Attachment findUserAttachment(Id parentId){
        List<Attachment> settingAttachment = [select id, body from attachment where parentID=:parentId];
        if(!settingAttachment.isEmpty()){
            return settingAttachment[0];
        }
        return null;
    }
    
    private Admin getConfig(){
        Admin admin = new Admin();
        admin.alertsView = true;
        admin.calendarView = true;
        admin.contactView = true;
        admin.listView = true;
        
        admin.opportunitySettings = new Admin.opportunitySettings();
        admin.opportunitySettings.optyListSearch = true;
        admin.opportunitySettings.optyRecordQuickEdit = true;
        admin.opportunitySettings.addNewTask = true;
        admin.opportunitySettings.optyRecordInlineMenu = true;
        admin.opportunitySettings.optyRecordSync = true;
        admin.opportunitySettings.noOfRecordsDisplayed = 5;
        
        admin.alertSettings = new Admin.AlertSettings();
        admin.alertSettings.closeDate = true;
        admin.alertSettings.notes = true;
        admin.alertSettings.sales = true;
        admin.alertSettings.updateAlerts = true;

        admin.calendarSettings = new Admin.CalendarSettings();
        admin.calendarSettings.dayListView = true;
        admin.calendarSettings.dayView = true;
        admin.calendarSettings.monthView = true;
        admin.calendarSettings.weekListView = true;
        admin.calendarSettings.weekView = true;

        admin.contactsSettings = new Admin.ContactsSettings();
        admin.contactsSettings.allContacts = true;
        admin.contactsSettings.myContacts = true;
        
        return admin;
    }
    
}