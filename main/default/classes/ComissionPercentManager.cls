public inherited sharing class ComissionPercentManager {

    public class CommissionPercentWrapper {
        public Id brokerId {get; set;}
        public Decimal commissionPercent {get; set;}
        public Id dealId {get; set;}
    }

    public static Commission_Percent__c createCommissionPercent(CommissionPercentWrapper wrapper, Boolean serialize) {
        Commission_Percent__c commissionPercent = new Commission_Percent__c();
        commissionPercent.Deal__c = wrapper.dealId;
        commissionPercent.Commission_Percent__c = wrapper.commissionPercent;
        commissionPercent.Broker__c = wrapper.brokerId;

        if (serialize) {
            insert commissionPercent;
        }
        return commissionPercent;
    }

    public static List<Commission_Percent__c> getCommissionPercentsByIds(List<Id> ids, String fields) {
        return Database.query('SELECT ' + fields + ' FROM Commission_Percent__c WHERE Id IN :ids');
    }

    public static List<Commission_Percent__c> getCommissionPercentsByBrokers(List<Id> brokers, String fields) {
        return Database.query('SELECT ' + fields + ' FROM Commission_Percent__c WHERE Broker__c IN :brokers');
    }

    public static List<Commission_Percent__c> updateCommissionPercents(List<Id> brokers, Decimal newPercent, Boolean serialize) {
        List<Commission_Percent__c> commissionPercents = [SELECT Commission_Percent__c FROM Commission_Percent__c WHERE Broker__c IN :brokers];
        for (Commission_Percent__c commissionPercent : commissionPercents) {
            commissionPercent.Commission_Percent__c = newPercent;
        }

        if (serialize) {
            update commissionPercents;
        }
        return commissionPercents;
    }

    public static void deleteCommissionPercents(List<Id> brokers) {
        delete [SELECT Id FROM Commission_Percent__c WHERE Broker__c IN :brokers];
    }
}
