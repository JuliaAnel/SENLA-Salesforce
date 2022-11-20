import { LightningElement, api } from 'lwc';

export default class PropertyParent extends LightningElement {
    propertyRecordType;
    showPropertyTypePicker = true;
    showPropertyFields = false;

    @api recordId;
    @api objectApiName;

    handleRecordTypeSubmit(event){
        this.showPropertyTypePicker = false;
        this.showPropertyFields = true;
        this.propertyRecordType = event.detail.propertyRecordType;
    }

    handleRecordCreation(event) {
        this.showPropertyTypePicker = true;
        this.showPropertyFields = false;
    }
}