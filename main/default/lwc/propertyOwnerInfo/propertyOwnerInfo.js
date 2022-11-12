import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import OWNER_FIRST_NAME from '@salesforce/schema/Property__c.Property_Owner__r.FirstName';
import OWNER_LAST_NAME from '@salesforce/schema/Property__c.Property_Owner__r.LastName';
import OWNER_MOBILE_PHONE from '@salesforce/schema/Property__c.Property_Owner__r.MobilePhone';
import OWNER_HOME_PHONE from '@salesforce/schema/Property__c.Property_Owner__r.HomePhone';
import OWNER_EMAIL from '@salesforce/schema/Property__c.Property_Owner__r.Email';
import OWNER_TOTAL_PROPERTY_PRICE from '@salesforce/schema/Property__c.Property_Owner__r.Total_Property_Price__c';

import PROPERTY_ID from '@salesforce/schema/Property__c.Id';
import PROPERTY_OWNER from '@salesforce/schema/Property__c.Property_Owner__r.Id';

const owner_fields = [OWNER_FIRST_NAME, OWNER_LAST_NAME, OWNER_PHONE, OWNER_HOME_PHONE, OWNER_EMAIL, OWNER_TOTAL_PROPERTY_PRICE];

export default class propertyOwnerInfo extends NavigationMixin(LightningElement) {

    @api recordId;
    
    @wire(getRecord, { recordId: '$recordId', fields: [PROPERTY_ID, PROPERTY_OWNER] })
    property;
    @wire(getRecord, { recordId: '$ownerId', fields: owner_fields})
    owner;

    get propertyOwnerId() {
        return getFieldValue(this.property.data, PROPERTY_OWNER);
    }


    get firstName(){
        return getFieldValue(this.owner.data, OWNER_FIRST_NAME);
    }

    get lastName(){
        return getFieldValue(this.owner.data, OWNER_LAST_NAME);
    }

    get mobilePhone(){
        return getFieldValue(this.owner.data, OWNER_MOBILE_PHONE);
    }

    get homePhone(){
        return getFieldValue(this.owner.data, OWNER_HOME_PHONE);
    }

    get email(){
        return getFieldValue(this.owner.data, OWNER_EMAIL);
    }

    get totalPropertyPrice(){
        return getFieldValue(this.owner.data, OWNER_TOTAL_PROPERTY_PRICE);
    }

    navigateToRecordViewPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.ownerId,
                objectApiName: 'Contact', 
                actionName: 'view'
            }
        });
    }
}