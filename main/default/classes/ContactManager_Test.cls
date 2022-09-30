@isTest 
private class ContactManager_Test {
    
    @TestSetup static void setup() {
        TestDataFactory.createContact('Angelina', 'Jolie', 'Edge Communications');
        TestDataFactory.createContact('Brad', 'Pitt', 'Edge Communications');
    }
    
    @isTest static void testGetContactByIds(){
        List<Id> ids = new List<Id>();
        for (Contact c : [SELECT Id FROM Contact WHERE Account = 'Edge Communications']) {
            ids.add(c.Id);
        }
        List<Contact> result = ContactManager.getContactsByIds(ids, 'Edge Communications');
        System.assertEquals(ids.size(), result.size());
    }

    @IsTest static void testCreateContact() {
        ContactManager.ContactWrapper wrapper = new ContactManager.ContactWrapper();
        wrapper.firstName = 'Mary';
        wrapper.lastName = 'Beasley';
        wrapper.phone = '915476584';
        wrapper.email = 'mary@gmail.com';
        wrapper.recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName()
        .get('Broker').getRecordTypeId();
        Contact c = ContactManager.createContact(wrapper,true);
        Contact con = [SELECT Email FROM Contact WHERE LastName = 'Beasley'];
        System.assertEquals('mary@gmail.com', con.Email);
        
     }
    
    @IsTest static void testUpdateContact() {
        Id contactId = [SELECT Id FROM Contact WHERE FirstName = :'Mary'].Id;
        String phone = '657483839';
        ContactManager.updateContact(new List<Id>{contactId}, phone, true);
        System.assertEquals([SELECT Phone FROM Contact WHERE Phone = :phone], '657483839');
    }
    
    @IsTest static void testDeleteContactByEmail() {
		List<String> emails = new List<String>();
        emails.add('mary@gmail.com');
        ContactManager.deleteContactByEmail(emails);
        List<Contact> contacts = [SELECT Id FROM Contact WHERE Email IN :emails];
        System.assertEquals(contacts, null);
    }
}
