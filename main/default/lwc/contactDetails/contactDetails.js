import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { OWNER_FIRST_NAME, OWNER_LAST_NAME, OWNER_PHONE, OWNER_HOME_PHONE, OWNER_EMAIL,
        OWNER_TOTAL_PROPERTY_PRICE, PROPERTY_OWNER, STANDARD_RECORD_PAGE,
        PAGE_ACTION_NAME_VIEW, CONTACT_OBJECT, CONTACT_ID, PROPERTY_OWNER_FIELDS, navigateTo } from 'c/utils';

export default class ContactDetails extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: CONTACT_ID })
    contact;
    
    // get firstName(){
    //     return getFieldValue(this.owner.data, OWNER_FIRST_NAME);
    // }

    // get lastName(){
    //     return getFieldValue(this.owner.data, OWNER_LAST_NAME);
    // }

    // get phone(){
    //     return getFieldValue(this.owner.data, OWNER_PHONE);
    // }

    // get homePhone(){
    //     return getFieldValue(this.owner.data, OWNER_HOME_PHONE);
    // }

    // get email(){
    //     return getFieldValue(this.owner.data, OWNER_EMAIL);
    // }

    // get totalPropertyPrice(){
    //     return getFieldValue(this.owner.data, OWNER_TOTAL_PROPERTY_PRICE);
    // }
}