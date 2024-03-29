public inherited sharing class ContactManager {

    public class ContactWrapper{
        public String firstName {get; set;}
        public String lastName {get; set;}
        public String phone {get; set;}
        public String email {get; set;}
        public Id recordTypeId {get; set;}
    }

    public static List<Contact> getContactByIds (List<Id> ids, String FirstName, String LastName) {
        return Database.query('SELECT ' + FirstName + LastName + ' FROM Contact WHERE Id IN :ids');
    }

    public static Contact createContact (ContactWrapper wrapper, Boolean serialize) {

        Contact createdContact = new Contact();
        createdContact.FirstName = wrapper.firstName;
        createdContact.LastName = wrapper.lastName;
        createdContact.Phone = wrapper.phone;
        createdContact.Email = wrapper.email;
        createdContact.RecordTypeId = wrapper.recordTypeId;

            if(serialize) {
                insert createdContact;
            }
            return createdContact;

    }

    public static void updateContact(List<Id> ids, String phone) {
        List<Contact> contacts = [SELECT FirstName, LastName, MobilePhone FROM Contact WHERE Id in :ids];
        if (!contacts.isEmpty() && contacts != null) {
            for (Contact c : contacts) {
                c.Description = 'Your contact is created this month!';
            }
        } 
        update contacts; 
    }

    public static void deleteContactByEmail(List<String> email) {
        delete [SELECT Id FROM Contact WHERE Email IN :email];
    }
}
