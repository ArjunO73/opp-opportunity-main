public class AdminConfig {
	
    @AuraEnabled public Products products{set;get;}
    @AuraEnabled public Boolean addActivity{set;get;}
    @AuraEnabled public Boolean addNotes{set;get;}
    @AuraEnabled public SyncProduct syncProduct{set;get;}
    @AuraEnabled public Boolean edit{set;get;}
    @AuraEnabled public Boolean importProducts{set;get;}
    @AuraEnabled public Boolean search{set;get;}
    @AuraEnabled public Boolean favorite{set;get;}
    @AuraEnabled public Boolean probabilityIcons{set;get;}
    @AuraEnabled public Integer noOfRecords{set;get;}
    
    public class Products {
        @AuraEnabled public Boolean searchProduct{set;get;}
        @AuraEnabled public Boolean addProduct{set;get;}
        @AuraEnabled public Boolean displayProduct{set;get;}
        @AuraEnabled public Boolean editProduct{set;get;}
    }
    
    public class SyncProduct {
        @AuraEnabled public Boolean fieldsDisplay{set;get;}
        @AuraEnabled public Boolean relatedListDisplay{set;get;}
        @AuraEnabled public Boolean availableTarget{set;get;}
        @AuraEnabled public Boolean progressBar{set;get;}
    }
    
}