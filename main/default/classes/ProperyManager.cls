public inherited sharing class PropertyManager {

    public static List<Contact> getPropertyByIds(List<Id> ids, String fields) {
        return Database.query('SELECT ' + fields + ' FROM Property__c WHERE Id IN :ids');
    }

    public class PropertyWrapper{

        public String address {get; set;}
        public Double leasePrice {get; set;}
        public Double sellingPrice {get; set;}
    }

    public static Contact createProperty(PropertyWrapper wrapper, Boolean serialize) {

        Property createdProperty = new Property();
        
        createdProperty.Address__c = wrapper.address;
        createdProperty.Lease_Price__c = wrapper.leasePrice;
        createdProperty.Selling_Price__c = wrapper.sellingPrice;

            if(serialize) {
                Database.SaveResult[] results = Database.insert(createdProperty, false);
            }
            return createdProperty;
    }
}
