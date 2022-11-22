public with sharing class LogLWCController {

    @AuraEnabled(cacheable=false)
    public static LogLWC__c createLogLWC(String objectType, 
                                        String actionType, 
                                        String description, 
                                        String errorMessage){
        
            LogLWCManager.LogLWCWrapper wrapper = new LogLWCManager.LogLWCWrapper();
            wrapper.objectType = objectType;
            wrapper.actionType = actionType;
            wrapper.description = description;
            wrapper.isSuccessful = String.isEmpty(errorMessage) ? true : false;
            wrapper.errorMessage = errorMessage;    

            LogLWC__c log = LogLWCManager.createLog(wrapper, true);
            return log;   
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
