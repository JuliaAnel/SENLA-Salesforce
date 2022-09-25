public inherited sharing class LogManager {
    public static List<Contact> getContactByIds(List<Id> ids, String filds) {
        return Database.query('SELECT ' + fields + ' FROM Log__c WHERE Id IN :ids');
    }

    public static Log createLog(String type, String message) {

        Log createdLog = new Log();

        createdLog.Type = this.type;
        createdLog.Message = this.message;

        insert createdLog;
        
        return createdLog;
    }
}
