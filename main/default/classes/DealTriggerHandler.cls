public class DealTriggerHandler extends TriggerHandler{

List<Id> propertyIds = new List<Id>();

public override void afterUpdate() {
for(Id dealId : Trigger.newMap.keySet()) {
   Deal__c newDeal = Trigger.newMap.get(dealId);
   if (newDeal.RecordTypeId != DealManager.SALE_RECORD_TYPE_ID || newDeal.Status__c != 'Closed Won') continue;
   if (newDeal.Status__c != Trigger.oldMap.get(dealId).get(Deal__c.Status)) propertyIds.add(newDeal.Property__c);
}

if (!propertyIds.isEmpty()) {
   List<Deal__c> dealToChange = DealManager.getNotClosedSaleDealsByProperties(propertyIds);
   for (Deal__c dl : dealToChange) {
       dl.Status__c = 'Closed Lost';
   }
   update dealToChange;
        }
    }
}
