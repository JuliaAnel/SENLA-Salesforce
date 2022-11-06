public inherited sharing class DealManager {


public static final Id SALE_RECORD_TYPE_ID = Schema.SObjectType.Deal__c.getRecordTypeInfosByName()
.get('Sale Deal').getRecordTypeId();

public static List<Deal__c> getNotClosedSaleDealsByProperties(List<Id> propertyIds) {
   return [
           SELECT Id
           FROM Deal__c
           WHERE Selling_Property__c IN :propertyIds
           AND Status__c NOT IN ('Closed Won', 'Closed', 'Closed Lost')
           AND RecordTypeId = :SALE_RECORD_TYPE_ID
   ];
}
    public static List<Deal__c> getDealsByIds(List<Id> ids, String fields) {
        return Database.query('SELECT ' + fields + ' FROM Deal__c WHERE Id IN :ids');
    }

    public static List<Deal__c> getDealsBySeller(List<Id> sellers, String fields) {
        return Database.query('SELECT ' + fields + ' FROM Deal__c WHERE Seller__c IN :sellers' + ' GROUP BY Selling_Property__c.RecordTypeId');
    }

    public static Deal__c createDeal(Id sellingProperty, Date leaseStartDate, Date leaseEndDate, Boolean serialize) {

        Deal__c createdDeal = new Deal__c();
        
        createdDeal.Lease_Start_Date__c = leaseStartDate;
        createdDeal.Lease_End_Date__c = leaseEndDate;
        createdDeal.Selling_Property__c = sellingProperty;

            if(serialize) {
                insert createdDeal;
            }
            return createdDeal;
    }

    public static void updateDeal() {
        List<Deal__c> deals = [SELECT Id FROM Deal__c WHERE Lease_End_Date__c = Today];
        if (!deals.isEmpty() && deals != null) {
            for (Deal__c d : deals) {
                d.Status__c = 'Closed Won';
            }
        }
        update deals;
    }

    public static void deleteDeal(List<String> status) {
        delete [SELECT Id FROM Deal__c WHERE Status__c IN :status];
    }
}