import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import { getRecord } from 'lightning/uiRecordApi';
import PROPERTY_DETAILS from '@salesforce/messageChannel/PropertyDetails__c';
import { PROPERTY_OBJECT, PROPERTY_ID } from 'c/utils';

export default class PropertyDetails extends LightningElement {
    
    subscription;
    recordId;
    recordName;
    recordImage;
    propertyObject = PROPERTY_OBJECT.objectApiName;

    @wire(getRecord, { recordId: '$recordId', fields: PROPERTY_ID })
    properties

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
        this.recordId = message.propertyId;
        this.recordName = message.propertyName;
        this.recordImage = message.propertyImage;
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    } 
}