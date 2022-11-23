@isTest
private class LogLWCManager_Test {
    
    static final String FIELDS = 'ObjectType__c, ActionType__c, Description__c, IsSuccessful__c, ErrorMessage__c, CreatedDate';

    @testSetup 
    static void setup() {   
        LogLWC__c log1 = TestDataFactory.createLogLWC('Property__c', 'Insert', 'description', true, '');
        LogLWC__c log2 = TestDataFactory.createLogLWC('Property__c', 'Update', 'description', false, 'Error Message');
        LogLWC__c log3 = TestDataFactory.createLogLWC('Property__c', 'Insert', 'description', true, '');
        LogLWC__c log4 = TestDataFactory.createLogLWC('Property__c', 'Insert', 'description', true, '');
    }
    
    @isTest static void createLogLWC(){
        LogLWCManager.LogLWCWrapper wrapper = new LogLWCManager.LogLWCWrapper();
        wrapper.objectType = 'Property__c';
        wrapper.actionType = 'Insert';
        wrapper.description = 'description';
        wrapper.isSuccessful = true;
        wrapper.errorMessage = '';

        LogLWC__c result = LogLWCManager.createLog(wrapper, false);
        System.assertEquals(result.ObjectType__c, 'Property__c');
    }

    @isTest static void testGetLogsLWC(){
        List<LogLWC__c> actualLogs = [SELECT Id FROM LogLWC__c];
        List<LogLWC__c> expectedLogs = LogLWCManager.getLogsLWC(FIELDS);
        System.assertEquals(actualLogs.size(), expectedLogs.size());
    }
}
