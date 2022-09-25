public inherited sharing class LogManager {

    public static List<Log__c> getLogByIds(List<Id> ids, String filds) {
        return Database.query('SELECT ' + fields + ' FROM Log__c WHERE Id IN :ids');
    }

    public static Log__c createLog(String type, String message) {

        Log__c createdLog = new Log__c();

        createdLog.Type = this.type;
        createdLog.Message = this.message;

        insert createdLog;
        
        return createdLog;
    }

    public static void deleteLog(List<String> types) {
        delete [SELECT Id FROM Log__c WHERE Log__c.Type IN :types];
    }
}
