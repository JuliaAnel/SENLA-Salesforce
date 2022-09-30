@isTest
private class LogManager_Test {
    @isTest static void testGetLogsByTypes(){
        List<Log__c> log = new List<Log__c>();
        log = LogManager.getLogsByTypes('Finest', 'Message');
        System.assertEquals(log.Type__c, 'Finest');
    }

    @IsTest static void testCreateLog() {
        Log__c log = LogManager.createLog('Finest', 'Message');
        Test.startTest();
        Database.SaveResult result = Database.insert(log);
        Test.stopTest();
        System.assert(result.isSuccess());
    }

    @IsTest static void testUpdateLogs() {
        Id logId = [SELECT Id FROM Log__c WHERE Type__c = 'Finest'].Id;
        List<Log__c> logs = LogManager.updateLogs(new List<Id>{logId}, 'Debug',true);
        System.assertEquals(1, logs.size());
    }

    @IsTest static void testDeleteLog() {
        List<String> types = new List<String>();
        types.add('Debug');
        LogManager.deleteLog(types);
        List<Log__c> logs = [SELECT Id FROM Log__c WHERE Type__c IN :types];
        System.assertEquals(logs, null);
    }
}
