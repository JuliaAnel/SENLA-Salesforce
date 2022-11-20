import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import PROPERTY_OBJECT from '@salesforce/schema/Property__c';

export default class PropertyRecordTypes extends LightningElement {
    
    propertyRecordType;

    @wire(getObjectInfo, { objectApiName: PROPERTY_OBJECT })
    objectInfo;

    get recordTypes() {
        const recordsTypeArray = [];
        const recordTypes = this.objectInfo.data.recordTypeInfos;
        Object.keys(recordTypes).forEach(element => {
            recordsTypeArray.push({ 
                name: recordTypes[element].name, 
                value: recordTypes[element].recordTypeId,
                checked: false,
            });
         });
        recordsTypeArray[0].checked = true;
        this.propertyRecordType = recordsTypeArray[0].value;
        return recordsTypeArray;
    }
    
    handleCheck(event) {
        Array.from(
            this.template.querySelectorAll('[data-id="record_type_checkbox"]')).forEach(element => {
            element.checked = false;
        });
        event.target.checked = true;
        this.propertyRecordType = event.target.name;
    }
    
    submitRecordType(event) {
        this.dispatchEvent(new CustomEvent("recordtypesubmit", {
            detail: {
                showPropertyTypePicker: false,
                showPropertyFields: true,
                propertyRecordType: this.propertyRecordType,
            }
        }));
    }
}