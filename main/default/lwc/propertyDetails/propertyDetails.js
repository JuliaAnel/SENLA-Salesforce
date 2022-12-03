import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import { getRecord } from 'lightning/uiRecordApi';
import PROPERTY_DETAILS from '@salesforce/messageChannel/PropertyDetails__c';
import { PROPERTY_OBJECT, PROPERTY_ID } from 'c/utils';

export default class PropertyDetails extends LightningElement {
    spinner = true;
    subscription;
    recordId;
    recordName;
    recordImage;
    errorItem;
    hasError = false;
    propertyObject = PROPERTY_OBJECT.objectApiName;

    @wire(getRecord, { recordId: '$recordId', fields: PROPERTY_ID })
    properties({ error, data }) {
        if (data) {
            this.properties = data;
            this.spinner = false;
        }
        else if (error) {
            this.hasError = true;
            this.errorItem = {message: error.message};
            this.properties = 0;
        }
    };

    @wire(MessageContext)
    messageContext;

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            PROPERTY_DETAILS,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.spinner = true;
        this.recordId = message.propertyId;
        this.recordName = message.propertyName;
        this.recordImage = message.propertyImage;
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
        this.spinner = false;
    } 
}