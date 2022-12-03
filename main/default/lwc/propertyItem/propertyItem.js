import { LightningElement, api, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import PROPERTY_DETAILS from '@salesforce/messageChannel/PropertyDetails__c';
export default class PropertyItem extends LightningElement {
	@api propertyItem;

    @wire(MessageContext)
    messageContext;

	handlePropertyClick() { 
        const payload = { 
            propertyId: this.propertyItem.Id,
            propertyName: this.propertyItem.Name,
            propertyImage: this.propertyItem.Picture_URL__c
        };
        publish(this.messageContext, PROPERTY_DETAILS, payload);
    }
}