@isTest
private class ComissionPercentManager_Test {
    
    @IsTest static void testGetCommissionPercentsByIds() {
        Id commissionPercentId = [SELECT Id FROM Commission_Percent__c LIMIT 1].Id;
        System.assertEquals(1, CommissionPercentManager.getCommissionPercentsByIds(new List<Id>{commissionPercentId},'Id').size());
    }

    @IsTest static void testDeleteCommissionPercents() {
        Id brokerId = [SELECT Id FROM Contact WHERE LastName = 'Pitt' LIMIT 1].Id;
        CommissionPercentManager.deleteCommissionPercents(new List<Id>{brokerId});
        System.assertEquals(0, [SELECT COUNT() FROM Commission_Percent__c WHERE Broker__c = :brokerId]);
    }
}
