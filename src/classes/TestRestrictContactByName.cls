@isTest
public class TestRestrictContactByName {
    @isTest static void AddInvalidContact(){
        Contact NewContact = new Contact(LastName = 'INVALIDNAME', FirstName = 'Arjun');
        Test.startTest();
        Database.SaveResult ContactList = Database.insert(NewContact, false);
        Test.stopTest();
        System.assert(!ContactList.isSuccess());
        System.assert(ContactList.getErrors().size() > 0);
        System.assertEquals('The Last Name "INVALIDNAME" is not allowed for DML',
                             ContactList.getErrors()[0].getMessage());
    }
    @isTest static void AddValidContact(){
        Contact NewContact = new Contact(LastName = 'Arjun', FirstName = 'Otturu');
        
        Test.startTest();
        Database.SaveResult ContactList = Database.insert(NewContact, false);
        NewContact.LastName = 'INVALIDNAME';
        Database.SaveResult ContactListupdate = Database.update(NewContact, false);
        Test.stopTest();
         System.assert(ContactList.isSuccess());
        System.assert(ContactList.getErrors().size() == 0);
        System.assert(!ContactListupdate.isSuccess());
        System.assert(ContactListupdate.getErrors().size() > 0);
        System.assertEquals('The Last Name "INVALIDNAME" is not allowed for DML',
                             ContactListupdate.getErrors()[0].getMessage());
    }

}