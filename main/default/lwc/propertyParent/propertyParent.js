import { LightningElement, api } from 'lwc';

export default class PropertyParent extends LightningElement {
    propertyRecordType;
    isPropertyRecordTypeSubmitted = false;

    @api recordId;
    @api objectApiName;

    handleRecordTypeSubmit(event){
        this.isPropertyRecordTypeSubmitted = event.detail.isPropertyRecordTypeSubmitted;
        this.propertyRecordType = event.detail.propertyRecordType;
    }
}