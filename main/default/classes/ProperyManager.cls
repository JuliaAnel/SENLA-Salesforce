public inherited sharing class PropertyManager {

    public class PropertyWrapper{

        public String address {get; set;}
        public Double leasePrice {get; set;}
        public Double sellingPrice {get; set;}
    }

    public static List<Property__c> getPropertyByIds(List<Id> ids, String fields) {
        return Database.query('SELECT ' + fields + ' FROM Property__c WHERE Id IN :ids');
    }

    public static Property__c createProperty(PropertyWrapper wrapper, Boolean serialize) {

        Property__c createdProperty = new Property__c();

        createdProperty.Address__c = wrapper.address;
        createdProperty.Lease_Price__c = wrapper.leasePrice;
        createdProperty.Selling_Price__c = wrapper.sellingPrice;

            if(serialize) {
                Database.SaveResult[] results = Database.insert(createdProperty, false);
            }

            for (Database.SaveResult sr : results) {
                if (sr.isSuccess()) {
                    System.debug('Successfully inserted Property');
                } else {
                    for(Database.Error err : sr.getErrors()) {
                        System.debug('The following error has occurred.');
                        System.debug(err.getStatusCode() + ': ' + err.getMessage());
                        System.debug('Property fields that affected this error: ' + err.getFields());
                 }
                }
            }
            return createdProperty;
    }

    public static void deleteProperty(List<String> types) {
        delete [SELECT Id FROM Property__c WHERE RecordTypeId IN :types];
    }
}
