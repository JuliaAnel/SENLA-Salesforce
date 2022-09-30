@isTest
private class DealManager_Test {

    private static final Id propertyId = [SELECT Id FROM Property__c WHERE Lease_Price__c = 2500 LIMIT 1].Id;
    
    @isTest static void testGetDealsByIds(){
        List<Id> ids = new List<Id>();
        for (Deal__c deals : [SELECT Id FROM Deal__c]) {
            ids.add(deals.Id);
        }
        List<Deal__c> result = DealManager.getDealsByIds(ids, fields);
        System.assertEquals(ids.size(), result.size());
    }

    @isTest static void testCreateDeal(){
    Deal__c deal = DealManager.createDeal(propertyId, Date.today(), Date.today()+30, false);
    Test.startTest();
    Database.SaveResult result = Database.insert(deal);
    Test.stopTest();
    System.assert(result.isSuccess());
    }

    @IsTest static void testUpdateDeal() {
        Id dealId = [SELECT Id FROM Deal__c WHERE Lease_End_Date__c = Today].Id;
        String status = 'Closed Won';
        DealManager.updateDeal(new List<String>{dealId}, status, true);
        System.assertEquals(1, [SELECT COUNT() FROM Deal__c WHERE Status__c = :status]);
    }

    @IsTest static void testDeleteDeal() {
        for(Deal__c deals : [SELECT Id FROM Deal__c WHERE Status__c = 'Closed Won']);
        DealManager.deleteDeal(deals);
        System.assertEquals(deals, null);
    }
}
