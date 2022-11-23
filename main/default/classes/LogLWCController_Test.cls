@isTest
private class LogLWCController_Test {

    static final String FIELDS = 'ObjectType__c, ActionType__c, Description__c, IsSuccessful__c, ErrorMessage__c';
    static final String PROPERTY = 'Property__c';

    @IsTest static void testCreateLogLWC() {
        LogLWC__c log = TestDataFactory.createLogLWC('Property__c', 'Insert', 'description', true, '');
        Test.startTest();
        Database.SaveResult result = Database.insert(log);
        Test.stopTest();
        System.assert(result.isSuccess());
    }

    @isTest static void testGetLogsLWC(){
        List<LogLWC__c> actualLogs = [SELECT Id FROM LogLWC__c];
        List<LogLWC__c> expectedLogs = LogLWCManager.getLogsLWC(FIELDS);
        System.assertEquals(actualLogs.size(), expectedLogs.size());
    }
}
