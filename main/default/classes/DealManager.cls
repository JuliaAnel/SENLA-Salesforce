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
}