@isTest
private class LogLWCController_Test {

    static final String FIELDS = 'ObjectType__c, ActionType__c, Description__c, IsSuccessful__c, ErrorMessage__c';
    static final String PROPERTY = 'Property__c';

    @IsTest static void testCreateLogLWC() {
        LogLWCController.LogLWCWrapper wrapper = new LogLWCController.LogLWCWrapper();
        wrapper.objectType = 'Property__c';
        wrapper.actionType = 'Insert';
        wrapper.description = 'description';
        wrapper.isSuccessful = true;
        wrapper.errorMessage = '';
        LogLWC__c resultLog = LogLWCController.createLogLWC(wrapper);
        
        Test.startTest();
        Database.SaveResult result = Database.insert(resultLog);
        Test.stopTest();
        System.assert(result.isSuccess());
    }

    @isTest static void testGetLogsLWC(){
        List<LogLWC__c> actualLogs = [SELECT Id FROM LogLWC__c];
        List<LogLWC__c> expectedLogs = LogLWCController.getLogsLWC(FIELDS);
        System.assertEquals(actualLogs.size(), expectedLogs.size());
    }
}
