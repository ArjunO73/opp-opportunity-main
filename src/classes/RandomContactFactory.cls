public class RandomContactFactory {
    public static List<Contact> generateRandomContacts(Integer NumOfContacts, string LstName){
        List<Contact> ContactList = new List<Contact>();
        for (Integer i=0;i<NumOfContacts;i++)
        {
         ContactList.add(new Contact(LastName = LstName, FirstName = 'Test '+(i+1)));   
        }
        return ContactList;
    }

}