import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import OWNER_FIRST_NAME from '@salesforce/schema/Property__c.Property_Owner__r.FirstName';
import OWNER_LAST_NAME from '@salesforce/schema/Property__c.Property_Owner__r.LastName';
import OWNER_PHONE from '@salesforce/schema/Property__c.Property_Owner__r.Phone';
import OWNER_HOME_PHONE from '@salesforce/schema/Property__c.Property_Owner__r.HomePhone';
import OWNER_EMAIL from '@salesforce/schema/Property__c.Property_Owner__r.Email';
import OWNER_TOTAL_PROPERTY_PRICE from '@salesforce/schema/Property__c.Property_Owner__r.Total_Property_Price__c';
import PROPERTY_OWNER from '@salesforce/schema/Property__c.Property_Owner__c';

const FIELDS = [OWNER_FIRST_NAME, OWNER_LAST_NAME, OWNER_PHONE, OWNER_HOME_PHONE, OWNER_EMAIL, OWNER_TOTAL_PROPERTY_PRICE, PROPERTY_OWNER];

export default class PropertyOwnerInfo extends NavigationMixin(LightningElement) {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    owner;
    
    get firstName(){
        return getFieldValue(this.owner.data, OWNER_FIRST_NAME);
    }

    get lastName(){
        return getFieldValue(this.owner.data, OWNER_LAST_NAME);
    }

    get phone(){
        return getFieldValue(this.owner.data, OWNER_PHONE);
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

    navigateToOwnerPage(event) {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
          type: 'standard__recordPage',
            attributes: {
                recordId: getFieldValue(this.owner.data, PROPERTY_OWNER),
                objectApiName:'Contact',
                actionName: 'view'
            },
        });
    }
}