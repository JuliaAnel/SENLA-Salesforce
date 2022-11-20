public with sharing class PropertyOwnerInfoReportController {

    private final Contact contact;

    private static final String FIELDS = 'Name, Sum_of_the_deal__c, Sum_after_commission__c, Status__c, Selling_Property__r.RecordType.Name, Selling_Property__r.RecordTypeId';
    
    public PropertyOwnerInfoReportController(ApexPages.StandardController stdController) {
        this.contact = (Contact)stdController.getRecord();
    }

   public class DealWrapper {
       public String propertyRecordType {get;set;}
       public Integer numberOfWonDeals {get;set;}
       public Decimal totalDealAmount {get;set;}
       public Decimal dealAmountAfterCommission {get;set;}

        public DealWrapper(List<Deal__c> deals) {
            this.propertyRecordType = deals[0].Selling_Property__r.RecordType.Name;
            this.numberOfWonDeals = 0;
            this.totalDealAmount = 0;
            this.dealAmountAfterCommission = 0;
            

           for (Deal__c deal : deals) {
               if (deal.Status__c == 'Closed Won') {
                   this.numberOfWonDeals += 1;
               }
               this.totalDealAmount += deal.Sum_of_the_deal__c;
               this.dealAmountAfterCommission += deal.Sum_after_commission__c;
           }
       }
   }
   public List<DealWrapper> getDeals() {
   List<Deal__c> dealsBySeller = DealManager.getDealsBySeller(new List<Id>{contact.Id}, FIELDS);

   Map<String, List<Deal__c>> dealsMap = new Map<String, List<Deal__c>>();
       
        for(Deal__c deal : dealsBySeller) {
            if(dealsMap.get(deal.Selling_Property__r.RecordTypeId) == null) {
                dealsMap.put(deal.Selling_Property__r.RecordTypeId, new List<Deal__c>());
            }
           dealsMap.get(deal.Selling_Property__r.RecordTypeId).add(deal);
       }

       List<DealWrapper> wrapper = new List<DealWrapper>();
       
       for(List<Deal__c> newDeals : dealsMap.values()) {
           wrapper.add(new DealWrapper(newDeals));
       }
       return wrapper;
   }
}



    

