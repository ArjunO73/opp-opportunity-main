public with sharing class ContactController {
    /*@AuraEnabled
    public static List<Contact> getContacts() {
        System.debug('RecordType22');
        List<Contact> contacts = null;
		Set<Id> accIds = new Set<Id>();
        List<Opportunity> opportunityList = [select Id, AccountId from Opportunity where ownerId = :UserInfo.getUserId()];
        for(Opportunity opp : opportunityList){
            accIds.add(opp.AccountId);
        }
        contacts = [SELECT Id, Name, MailingStreet, Phone, Email, LeadSource FROM Contact where AccountId in :accIds];
        //Add isAccessible() check
        return contacts;
    }*/
     @AuraEnabled
    public static List<Contact> getContacts(String RecType) {
        System.debug('RecordType'+RecType);
        List<Contact> contacts = null;
        Set<Id> accIds = new Set<Id>();
        if(RecType == 'OppContactList'){
            List<Opportunity> opportunityList = [select Id, AccountId from Opportunity where ownerId = :UserInfo.getUserId()];
            for(Opportunity opp : opportunityList){
                accIds.add(opp.AccountId);
            }
        }
        else if(RecType == 'AccContactList'){
             List<Account> AccountList = [select Id from Account where ownerId = :UserInfo.getUserId()];
            for(Account Acc : AccountList){
                accIds.add(Acc.Id);
            }
        }
        else
        {
            List<Contact> contactList = [select Id, AccountId from Contact where ownerId = :UserInfo.getUserId()];
            for(Contact con : contactList){
                accIds.add(con.AccountId);
            }
        }
		
        
        contacts = [SELECT Id, Name, MailingStreet, Phone, Email, LeadSource FROM Contact where AccountId in :accIds];
        //Add isAccessible() check
        return contacts;
    }
}