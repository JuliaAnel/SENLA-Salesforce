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

    Contact firstPropertyOwner = TestDataFactory.createContact('Sam', 'Hill', '467358695');
    Contact secondPropertyOwner = TestDataFactory.createContact('Din', 'Deichman', '7896546789');  
    
    Property__c property1 = TestDataFactory.createProperty(firstPropertyOwner, 2500000, 250, INDUSTRIAL_PROPERTY);
    Property__c property2 = TestDataFactory.createProperty(secondPropertyOwner, 1200000, 120, INDUSTRIAL_PROPERTY);
    Property__c property3= TestDataFactory.createProperty(firstPropertyOwner, 3200000, 320, OFFICE_PROPERTY);
    Property__c property4 = TestDataFactory.createProperty(secondPropertyOwner, 7400000, 740, OFFICE_PROPERTY);
    Property__c property5 = TestDataFactory.createProperty(firstPropertyOwner, 1300000, 130, SPACE_PROPERTY);
    Property__c property6 = TestDataFactory.createProperty(secondPropertyOwner, 8500000, 850, SPACE_PROPERTY);

    Deal__c deal1 = TestDataFactory.createDeal(firstPropertyOwner, secondPropertyOwner, property1, 'Closed Won', SALE_TYPE);
    Deal__c deal2 = TestDataFactory.createDeal(firstPropertyOwner, secondPropertyOwner, property2, 'Closed Won', SALE_TYPE);
    Deal__c deal3 = TestDataFactory.createDeal(firstPropertyOwner, secondPropertyOwner, property3, 'Closed Won', SALE_TYPE);
    Deal__c deal4 = TestDataFactory.createDeal(firstPropertyOwner, secondPropertyOwner, property4, 'Closed Won', SALE_TYPE);
    Deal__c deal5 = TestDataFactory.createDeal(firstPropertyOwner, secondPropertyOwner, property5, 'Closed Won', SALE_TYPE);
    Deal__c deal6 = TestDataFactory.createDeal(firstPropertyOwner, secondPropertyOwner, property6, 'Closed Won', SALE_TYPE);

    @isTest static void testgetDeals() {
        Contact propertyOwner = [SELECT Id, Name FROM Contact WHERE FirstName = 'Hill' LIMIT 1];
       	ApexPages.StandardController stdController = new ApexPages.StandardController(propertyOwner);
        PropertyOwnerInfoReportController controller = new PropertyOwnerInfoReportController(stdController);

        List<PropertyOwnerInfoReportController.DealWrapper> result = controller.getDeals();
        System.assertEquals(690000, result[0].totalDealAmount);
        System.assertEquals(690, result[0].dealAmountAfterCommission);
    }

}
