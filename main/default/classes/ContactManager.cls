public inherited sharing class ContactManager {

    public class ContactWrapper{
        public String firstName {get; set;}
        public String lastName {get; set;}
        public String email {get; set;}
    }

    public static List<Contact> getContactByIds (List<Id> ids, String FirstName, String LastName) {
        return Database.query('SELECT ' + FirstName + LastName + ' FROM Contact WHERE Id IN :ids');
    }

    public static Contact createContact (ContactWrapper wrapper, Boolean serialize) {

        Contact createdContact = new Contact();
        createdContact.FirstName = wrapper.firstName;
        createdContact.LastName = wrapper.lastName;
        createdContact.Email = wrapper.email;

            if(serialize) {
                insert createdContact;
            }
            return createdContact;
    }

    public static void updateContact() {
        List<Contact> contacts = [SELECT Id, FirstName, LastName FROM Contact WHERE CreatedDate = LAST_MONTH];
        if (!contacts.isEmpty() && contacts != null) {
            for (Contact c : contacts) {
                Contact.Description = 'Your contact is created this month!';
            }
        } 
        update contacts; 
    }

    public static void deleteContactByEmail(List<String> email) {
        delete [SELECT Id FROM Contact WHERE Email IN :email];
    }
}
