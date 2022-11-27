public inherited sharing class PropertyManager {

    public class PropertyWrapper{
        @AuraEnabled 
        public String address {get; set;}
        @AuraEnabled 
        public Id owner {get; set;}
        @AuraEnabled 
        public Decimal leasePrice {get; set;}
        @AuraEnabled 
        public Decimal sellingPrice {get; set;}
    }

    public static List<Property__c> getAllProperties(String fields){
        return Database.query('SELECT ' + fields + ' FROM Property__c');
    }

    public static List<Property__c> getPropertyByIds(List<Id> ids, String fields) {
        return Database.query('SELECT ' + fields + ' FROM Property__c WHERE Id IN :ids');
    }

    @AuraEnabled(cacheable=true)
    public static AggregateResult getPropertiesCount(String value) {
        return Database.query('SELECT Count(Id) ' + value + ' FROM Property__c');
    }

    public static List<Property__c> getPropertiesWithLimit(String fields, Integer pageSize, Integer offset) {
        return Database.query('SELECT ' + fields + ' FROM Property__c ORDER BY Name LIMIT :pageSize OFFSET :offset');
    }

    @AuraEnabled
    public static void createPropertyList(String wrappersJson) {
     List<PropertyWrapper> wrappers=(List<PropertyWrapper>)JSON.deserialize(wrappersJson,List<PropertyWrapper>.class);
     List<Property__c> propertiesList=new List<Property__c>();
     for(Integer i=0;i<wrappers.size();i++){
         Property__c property = new Property__c();
         property.Address__c = wrappers[i].address;
         property.Property_Owner__c = wrappers[i].owner; 
         property.Lease_Price__c = wrappers[i].leasePrice;
         property.Selling_Price__c = wrappers[i].sellingPrice;
          
         propertiesList.add(property); 
         }
         insert propertiesList;  
     }

    public static Property__c createProperty(PropertyWrapper wrapper, Boolean serialize) {

        Property__c createdProperty = new Property__c();

        createdProperty.Address__c = wrapper.address;
        createdProperty.Property_Owner__c = wrapper.owner;
        createdProperty.Lease_Price__c = wrapper.leasePrice;
        createdProperty.Selling_Price__c = wrapper.sellingPrice;

            if(serialize) {
                Database.SaveResult result = Database.insert(createdProperty, false);
            if (result.isSuccess()) {
                System.debug('Successfully inserted Property');
            } else {
                for(Database.Error err : result.getErrors()) {
                    System.debug('The following error has occurred.');
                    System.debug(err.getStatusCode() + ': ' + err.getMessage());
                    System.debug('Property fields that affected this error: ' + err.getFields());
                 }
                }
        }
            return createdProperty;
    }

    public static List<Property__c> updatePropertyOwner(List<Id> ids, Id newOwner, Boolean serialize) {
        List<Property__c> propertiesToUpdate = [SELECT Property_Owner__c FROM Property__c WHERE id IN :ids];
        for (Property__c property : propertiesToUpdate) {
            property.Property_Owner__c = newOwner;
        }

        if (serialize) {
            update propertiesToUpdate;
        }
        return propertiesToUpdate;
    }

    public static void deleteProperty(List<String> types) {
        delete [SELECT Id FROM Property__c WHERE RecordTypeId IN :types];
    }
}
