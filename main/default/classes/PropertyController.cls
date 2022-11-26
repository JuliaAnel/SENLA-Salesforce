public with sharing class PropertyController {

    @AuraEnabled(cacheable=true)
    public static Integer getPropertiesCount() {
        try {
            AggregateResult recordCount = PropertyManager.getPropertiesCount('recordsCount');
            return Integer.valueOf(recordCount.get('recordsCount'));
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}