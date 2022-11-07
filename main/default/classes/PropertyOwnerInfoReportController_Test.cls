@isTest
private class PropertyOwnerInfoReportController_Test {
    
    private static final Id PROPERTY_OWNER = Schema.SObjectType.Contact.getRecordTypeInfosByName()
        .get('Property Owner').getRecordTypeId();
    private static final Id SALE_DEAL = Schema.SObjectType.Deal__c.getRecordTypeInfosByName()
        .get('Sale Deals').getRecordTypeId();
    private static final Id INDUSTRIAL_PROPERTY = Schema.SObjectType.Property__c.getRecordTypeInfosByName()
        .get('Industrial').getRecordTypeId();
    private static final Id OFFICE_PROPERTY = Schema.SObjectType.Property__c.getRecordTypeInfosByName()
        .get('Office').getRecordTypeId();
    private static final Id SPACE_PROPERTY = Schema.SObjectType.Property__c.getRecordTypeInfosByName()
        .get('Space').getRecordTypeId();

    @TestSetup
    static void setup(){
    Contact firstPropertyOwner = TestDataFactory.createContact('Sam', 'Hill', '467358695');
    Contact secondPropertyOwner = TestDataFactory.createContact('Din', 'Deichman', '7896546789');  
    
    Property__c property1 = TestDataFactory.createNewProperty(firstPropertyOwner, 2500000, 250, INDUSTRIAL_PROPERTY);
    Property__c property2 = TestDataFactory.createNewProperty(secondPropertyOwner, 1200000, 120, INDUSTRIAL_PROPERTY);
    Property__c property3= TestDataFactory.createNewProperty(firstPropertyOwner, 3200000, 320, OFFICE_PROPERTY);
    Property__c property4 = TestDataFactory.createNewProperty(secondPropertyOwner, 7400000, 740, OFFICE_PROPERTY);
    Property__c property5 = TestDataFactory.createNewProperty(firstPropertyOwner, 1300000, 130, SPACE_PROPERTY);
    Property__c property6 = TestDataFactory.createNewProperty(secondPropertyOwner, 8500000, 850, SPACE_PROPERTY);

    Deal__c deal1 = TestDataFactory.createNewDeal(firstPropertyOwner, secondPropertyOwner, property1, 'Closed Won', SALE_DEAL);
    Deal__c deal2 = TestDataFactory.createNewDeal(firstPropertyOwner, secondPropertyOwner, property2, 'Closed Won', SALE_DEAL);
    Deal__c deal3 = TestDataFactory.createNewDeal(firstPropertyOwner, secondPropertyOwner, property3, 'Closed Won', SALE_DEAL);
    Deal__c deal4 = TestDataFactory.createNewDeal(firstPropertyOwner, secondPropertyOwner, property4, 'Closed Won', SALE_DEAL);
    Deal__c deal5 = TestDataFactory.createNewDeal(firstPropertyOwner, secondPropertyOwner, property5, 'Closed Won', SALE_DEAL);
    Deal__c deal6 = TestDataFactory.createNewDeal(firstPropertyOwner, secondPropertyOwner, property6, 'Closed Won', SALE_DEAL);
    }

    @isTest static void testgetDeals() {
        Contact propertyOwner = [SELECT Id, Name FROM Contact WHERE FirstName = 'Hill' LIMIT 1];
       	ApexPages.StandardController stdController = new ApexPages.StandardController(propertyOwner);
        PropertyOwnerInfoReportController controller = new PropertyOwnerInfoReportController(stdController);

        List<PropertyOwnerInfoReportController.DealWrapper> result = controller.getDeals();
        System.assertEquals(690000, result[0].totalDealAmount);
        System.assertEquals(690, result[0].dealAmountAfterCommission);
    }

}
