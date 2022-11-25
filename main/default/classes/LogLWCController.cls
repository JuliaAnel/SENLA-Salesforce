public with sharing class LogLWCController {

    public class LogLWCWrapper{
        @AuraEnabled
        public String objectType {get; set;}
        @AuraEnabled
        public String actionType {get; set;}
        @AuraEnabled
        public String description {get; set;}
        @AuraEnabled
        public Boolean isSuccessful {get; set;}
        @AuraEnabled
        public String errorMessage {get; set;}
    }

    @AuraEnabled(cacheable=false)
    public static LogLWC__c createLogLWC(LogLWCWrapper wrapper){
        try {
            wrapper.isSuccessful = String.isEmpty(wrapper.errorMessage) ? true : false;            
            LogLWC__c log = LogLWCManager.createLog(wrapper, true);
            return log;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<LogLWC__c> getLogsLWC(String fields){
        try {
            return LogLWCManager.getLogsLWC(fields);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
