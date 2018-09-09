public class gettestnotes {
    @AuraEnabled
    public static List<Opportunity> getSelectedOppty(String opptyId)
    {
        List<Opportunity> MyOppty=[SELECT Id, Name FROM Opportunity where Id =: opptyId];
        return MyOppty;
    }
    
    @AuraEnabled
    public static List<Note> getData(String opptyId)
    {
        List<Note> myn =[SELECT parentId, Title, Body FROM Note where parentId =: opptyId];
    	return myn;
    }
 
    @AuraEnabled
    public static void saveData(Note nObj, String notesBody, String opptyId)
    {
        
        List<Note> mynotes = [SELECT Title, Body FROM Note where parentId =:opptyId];
        if(mynotes.size()==0){
            note n = new note();
            n.parentId= opptyId; //Id of the opportunity for which you want to add this note
            n.body=notesBody; // body of the note. this should be populated from the notes field that you have shown in the screenshot
            n.title=opptyId+' Notes1'; // the title of the note
            n.isPrivate=false;  // if private it will be visible only for the owner and any user with modify all permission
        	insert n;
        }
        else{
           Note mynotes1 = [SELECT Title, Body FROM Note where parentId =:opptyId and Id=:nObj.Id];
            mynotes1.Body=notesBody;
            upsert mynotes1; 
        }
}
    
}