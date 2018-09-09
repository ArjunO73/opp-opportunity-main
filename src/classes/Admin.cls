public class Admin {

    @AuraEnabled public Boolean alertsView{get;set;}
    @AuraEnabled public Boolean calendarView{get;set;}
    @AuraEnabled public Boolean contactView{get;set;}
    @AuraEnabled public Boolean listView{get;set;}
    @AuraEnabled public OpportunitySettings opportunitySettings{get;set;}
    @AuraEnabled public AlertSettings alertSettings{get;set;}
    @AuraEnabled public CalendarSettings calendarSettings{get;set;}
    @AuraEnabled public ContactsSettings contactsSettings{get;set;}
    
    public class OpportunitySettings{
        @AuraEnabled public Boolean optyListSearch{get;set;}
        @AuraEnabled public Boolean optyRecordQuickEdit{get;set;}
        @AuraEnabled public Boolean addNewTask{get;set;}
        @AuraEnabled public Boolean optyRecordInlineMenu{get;set;}
        @AuraEnabled public Boolean optyRecordSync{get;set;}
        @AuraEnabled public Integer noOfRecordsDisplayed{get;set;}
    }
    
    public class AlertSettings{
        @AuraEnabled public Boolean closeDate{get;set;}
        @AuraEnabled public Boolean notes{get;set;}
        @AuraEnabled public Boolean sales{get;set;}
        @AuraEnabled public Boolean updateAlerts{get;set;}
    }
    
    public class CalendarSettings{
        @AuraEnabled public Boolean dayListView{get;set;}
        @AuraEnabled public Boolean dayView{get;set;}
        @AuraEnabled public Boolean monthView{get;set;}
        @AuraEnabled public Boolean weekListView{get;set;}
        @AuraEnabled public Boolean weekView{get;set;}
    }
    
    public class ContactsSettings{
        @AuraEnabled public Boolean allContacts{get;set;}
        @AuraEnabled public Boolean myContacts{get;set;}
    }
    
}