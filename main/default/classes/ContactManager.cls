public inherited sharing class ContactManager {
    public static List<Contact> getContactByIds(List<Id> ids, String FirstName, String LastName) {
        return Database.query('SELECT ' + FirstName + LastName + ' FROM Contact WHERE Id IN :ids');
    }

    public class ContactWrapper{
        public String firstName {get; set;}
        public String lastName {get; set;}
        public String email {get; set;}
    }

    public static Contact createContact(ContactWrapper wrapper, Boolean serialize) {

        Contact createdContact = new Contact();
        createdContact.FirstName = wrapper.firstName;
        createdContact.LastName = wrapper.lastName;
        createdContact.Email = wrapper.email;

            if(serialize) {
                insert createdContact;
            }
            return createdContact;
    }
}
