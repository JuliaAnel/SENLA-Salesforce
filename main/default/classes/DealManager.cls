public inherited sharing class DealManager {
    
    public static List<Contact> getDealsByIds(List<Id> ids, String fields) {
        return Database.query('SELECT ' + fields + ' FROM Deal__c WHERE Id IN :ids');
    }

    public static Deal createDeal(Date leaseStartDate, Date leaseEndDate, Boolean serialize) {

        Deal createdDeal = new Deal();
        
        createdDeal.Lease_Start_Date__c = this.leaseStartDate;
        createdDeal.Lease_End_Date__c = this.leaseEndDate;

            if(serialize) {
                insert createdDeal;
            }
            return createdDeal;
    }

    public static void updateDeal() {
        List<Deal__c> deals = [SELECT Id FROM Deal__c WHERE Lease_End_Date__c = Today];
        if (!deals.isEmpty() && deals != null) {
            for (Deal__c d : deals) {
                Deal__c.Status__c = 'Closed';
            }
        }
        update contacts;
    }

    public static void deleteDeal(List<String> status) {
        delete [SELECT Id FROM Deal__c WHERE Status__c IN :status];
    }
}