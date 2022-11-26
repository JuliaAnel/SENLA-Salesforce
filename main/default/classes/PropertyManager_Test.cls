@isTest
private class PropertyManager_Test {

    @TestSetup static void setup() {
        Contact contact = new Contact(FirstName = 'Christina', LastName = 'Agilera');
        insert contact;
    }

    @isTest static void testGetPropertyByIds() {
        List<Id> ids = new List<Id>();
        for(Property__c p : [SELECT Id FROM Property__c]);
        p.add(ids.Id);
        List<Property__c> properties = PropertyManager.getPropertyByIds(ids, 1000000);
        System.assertEquals(ids.size(), properties.size());
    }

    @IsTest static void testCreateProperty() {
        PropertyManager.PropertyWrapper wrapper = new PropertyManager.PropertyWrapper();
        wrapper.address = '345 Shoreline Park Mountain View, CA 94043 USA';
        wrapper.owner = contact.Id;
        wrapper.leasePrice = 2500;
        wrapper.sellingPrice = 1000000;
        Property__c property = PropertyManager.createProperty(wrapper, false);
        Test.startTest();
        Database.SaveResult result = Database.insert(property);
        Test.stopTest();
        System.assert(result.isSuccess());
    }

    @IsTest static void testUpdatePropertyOwner() {
        Id propertyId = [SELECT Id FROM Property__c WHERE Lease_Price__c = 2500].Id;
        Contact owner = new Contact(FirstName = 'Johnny', LastName = 'Depp');
        insert owner;
        PropertyManager.updatePropertyOwner(new List<Id>{propertyId}, owner.Id, true);
        System.assertEquals(1, [SELECT COUNT() FROM Property__c WHERE Property_Owner__c = :owner.Id]);
    }

    @isTest static void testDeleteProperty() {
        List<String> type = new List<String>();
        type.add(Schema.SObjectType.Property__c.getRecordTypeInfosByName()
        .get('Industrial').getRecordTypeId());
        PropertyManager.deleteProperty(type);
        System.assertEquals(type, null);
    }
}
