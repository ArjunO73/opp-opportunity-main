/**
 * Created by cxu on 10/02/2017.
 */
@IsTest
public with sharing class FastOpportunityControllerTest {
    @testSetup static void setup() {
        Pricebook2 pricebook = new Pricebook2();
        pricebook.Name = 'Test';
        pricebook.IsActive = true;
        
        insert pricebook;
        
        System.assert(pricebook.Id != null);
        
        Product2 product = new Product2(Name = 'Test product');
        insert product;
        
        System.assert(product.Id != null);
        
        Id pricebookId = Test.getStandardPricebookId();
        
        PricebookEntry standardPrice = new PricebookEntry(
            Pricebook2Id = pricebookId, Product2Id = product.Id,
            UnitPrice = 20, IsActive = true);
        insert standardPrice;
        
        System.assert(standardPrice.Id != null);
        
        PricebookEntry entry = new PricebookEntry(
            IsActive = true,
            Pricebook2Id = pricebook.Id,
            Product2Id = product.Id,
            UnitPrice = 20
        );
        
        insert entry;
        System.assert(entry.Id != null);
    }
    
    @IsTest static void getOpportunityTest() {
        Account account = new Account(Name = 'Test');
        insert account;

        Opportunity opportunity = new Opportunity(
            Name = 'Test Oppty', 
            AccountId = account.Id, 
            CloseDate = Date.today(),
            StageName = 'Prospecting'
        );
        insert opportunity;

        Opportunity actual = FastOpportunityController.getOpportunity(opportunity.Id);
        System.assertEquals(opportunity.Id, actual.Id);
        
        string error = FastOpportunityController.updateOpportunity(opportunity, Test.getStandardPricebookId());
        System.assertEquals('', error);
    }
    
    @isTest static void getPricebooksTest() {
        
        List<Pricebook2> pricebooks = FastOpportunityController.getPricebooks();
        System.assert(pricebooks != null);
        System.assertEquals(1, pricebooks.size());
        
        List<PricebookEntry> entries = FastOpportunityController.getPricebookEntries(pricebooks[0].Id);
        System.assert(entries != null);
        System.assertEquals(1, entries.size());
        
    }
    
    @isTest static void updateLineItemsTest() {
        Account account = new Account(Name = 'Test');
        insert account;

        Opportunity opportunity = new Opportunity(
            Name = 'Test Oppty', 
            AccountId = account.Id, 
            CloseDate = Date.today(),
            StageName = 'Prospecting'
        );
        insert opportunity;

        List<Pricebook2> pricebooks = FastOpportunityController.getPricebooks();
        List<PricebookEntry> entries = FastOpportunityController.getPricebookEntries(pricebooks[0].Id);
        
        OpportunityLineItem item1 = new OpportunityLineItem(OpportunityId = opportunity.Id, PricebookEntryId = entries[0].Id, Quantity = 1, UnitPrice = 20);
        OpportunityLineItem item2 = new OpportunityLineItem(OpportunityId = opportunity.Id, PricebookEntryId = entries[0].Id, Quantity = 2, UnitPrice = 30);
        
        insert item1;
        insert item2;
        
        List<OpportunityLineItem> items = new List<OpportunityLineItem>();
        item1.Quantity = 10;
        OpportunityLineItem item3 = new OpportunityLineItem(OpportunityId = opportunity.Id, PricebookEntryId = entries[0].Id, Quantity = 4, UnitPrice = 10);

        items.add(item1);
        items.add(item3);
        
        List<OpportunityLineItem> newItems = FastOpportunityController.updateLineItems(items, opportunity.Id);
        System.assert(newItems != null);
        System.assertEquals(2, newItems.size());
    }
}