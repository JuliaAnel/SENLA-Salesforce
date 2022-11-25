import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { OWNER_FIRST_NAME, OWNER_LAST_NAME, OWNER_PHONE, OWNER_HOME_PHONE, OWNER_EMAIL,
        OWNER_TOTAL_PROPERTY_PRICE, PROPERTY_OWNER, STANDARD_RECORD_PAGE,
        PAGE_ACTION_NAME_VIEW, CONTACT_OBJECT, PROPERTY_OWNER_FIELDS, navigateTo } from 'c/utils';

export default class PropertyOwnerInfo extends NavigationMixin(LightningElement) {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: PROPERTY_OWNER_FIELDS })
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
        navigateTo(
            this,
            STANDARD_RECORD_PAGE, 
            getFieldValue(this.owner.data, PROPERTY_OWNER),
            CONTACT_OBJECT,
            PAGE_ACTION_NAME_VIEW
        );
    }
}