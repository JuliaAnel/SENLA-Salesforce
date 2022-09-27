@IsTest
public class TestDataFactory {

    public static final String EN = 'en_US';
    public static final Id DEFAULT_CONTACT_TYPE = Schema.SObjectType.Contact.getRecordTypeInfosByName()
                                                  .get('Broker').getRecordTypeId();
    public static final Id DEFAULT_PROPERTY_TYPE = Schema.SObjectType.Property__c.getRecordTypeInfosByName()
                                                  .get('Industrial').getRecordTypeId();                                              
    public static final Id DEFAULT_DEAL_TYPE = Schema.SObjectType.Deal__c.getRecordTypeInfosByName()
                                                  .get('Sale').getRecordTypeId();
    public static final Id EU_EAST_MANAGER_ROLE_ID = [SELECT Id FROM UserRole WHERE DeveloperName = 'Eu_East_Manager' LIMIT 1].Id;
    public static final Id MANAGER_PROFILE_ID = [SELECT Id FROM Profile WHERE Name = 'Manager' LIMIT 1].Id;
    public static final Id CEO_ROLE_ID = [SELECT Id FROM UserRole WHERE DeveloperName = 'CEO' LIMIT 1].id;
    public static final Id STANDARD_PLATFORM_USER_PROFILE_ID = [SELECT Id FROM Profile WHERE Name = 'Standard Platform User' LIMIT 1].Id;

    public static User createManagerUser(String name, String language) {
        User user = new User(LastName = name, LanguageLocaleKey = language, Username = name + '@username.com',
                             Email = name + '@test.com', Alias = name, TimeZoneSidKey = 'Europe/Minsk',
                             LocaleSidKey = language, EmailEncodingKey = 'UTF-8', ProfileId = MANAGER_PROFILE_ID,
                             UserRoleId = EU_EAST_MANAGER_ROLE_ID);
        insert user;
        return user;
    }

    public static User createStandardPlatformUser(Contact contact) {
        User user = new User(ProfileId = STANDARD_PLATFORM_USER_PROFILE_ID, ContactId = contact.Id, LastName = contact.LastName,
                             LanguageLocaleKey = EN, Username = contact.LastName + '@username.com',
                             Email = contact.LastName + '@test.com', Alias = 'asdzxc', UserRoleId = CEO_ROLE_ID,
                             TimeZoneSidKey = 'Europe/Minsk', LocaleSidKey = EN, EmailEncodingKey = 'UTF-8');
        insert user;
        return user;
    }

    public static Contact createContact(String firstName, String lastName, Account acc) {
        Contact contact = new Contact(FirstName = firstName, LastName = lastName, AccountId = acc.Id, RecordTypeId = DEFAULT_CONTACT_TYPE);
        insert contact;
        return contact;
    }

    public static List<Contact> createContacts(Integer count) {
        List<Contact> contacts = new List<Contact>(count);
        for (Integer i = 0; i < count; i++) {
            contacts[i] = new Contact(FirstName = 'test' + i, Email = 'test' + i + '@mail.ru', RecordTypeId = DEFAULT_CONTACT_TYPE);
        }
        insert contacts;
        return contacts;
    }

    public static Property__c createProperty(Contact owner, Decimal sellingPrice, Decimal leasePrice, String address) {
        Property__c properties = new Property__c(Property_Owner__c = owner.Id, Selling_Price__c = sellingPrice,
                                        Lease_Price__c = leasePrice, Address__c = address, RecordTypeId = DEFAULT_PROPERTY_TYPE);
        insert properties;
        return properties;
    }

    public static List<Property__c> createProperties(Integer count, Contact owner) {
        List<Property__c> properties = new List<Property__c>(count);
        for (Integer i = 0; i < count; i++) {
            properties[i] = new Property__c(Property_Owner__c = owner.Id, RecordTypeId = DEFAULT_PROPERTY_TYPE);
        }
        insert properties;
        return properties;
    }

    public static Deal__c createDeal(Contact seller, Contact customer) {
        Deal__c deal = new Deal__c(Seller__c = seller.Id, Customer__c = customer.Id, RecordTypeId = DEFAULT_DEAL_TYPE);
        insert deal;
        return deal;
    }

    public static List<Deal__c> createDeals(Integer count, Contact buyer, Contact seller) {
        List<Deal__c> deals = new List<Deal__c>(count);
        for (Integer i = 0; i < count; i++) {
            deals[i] = new Deal__c(Buyer__c = buyer.Id, Seller__c = seller.Id,
                                   Status__c = 'Open', RecordTypeId = DEFAULT_DEAL_TYPE);
        }
        insert deals;
        return deals;
    }

    public static Log__c createLog(String type, String message) {
        Log__c log = new Log__c(Type__c = type, Message__c = message);
        insert log;
        return log;
    }

    public static List<Log__c> createLogs(Integer count) {
        List<Log__c> logs = new List<Log__c>(count);
        for (Integer i = 0; i < count; i++) {
            logs[i] = new Log__c(Type__c = 'FINEST', Message__c = 'Finest' + i);
        }
        insert logs;
        return logs;
    }
}