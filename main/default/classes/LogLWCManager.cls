public inherited sharing class LogLWCManager {
    
    public static LogLWC__c createLog(LogLWCController.LogLWCWrapper wrapper, Boolean serialize) {
        LogLWC__c log = new LogLWC__c();
        log.ObjectType__c = wrapper.objectType;
        log.ActionType__c = wrapper.actionType;
        log.Description__c = wrapper.description;
        log.IsSuccessful__c = wrapper.isSuccessful;
        log.ErrorMessage__c = wrapper.errorMessage;

        if (serialize) insert log;
        return log;
    }

    public static List<LogLWC__c> getLogsLWC(String fields) {
        return Database.query('SELECT ' + fields + ' FROM LogLWC__c');
    }
}