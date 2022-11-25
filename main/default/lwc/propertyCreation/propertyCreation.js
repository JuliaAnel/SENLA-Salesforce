import { LightningElement, api, wire, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import createLogLWC from '@salesforce/apex/LogLWCController.createLogLWC';
import { SUCCESS_TITLE, 
    SUCCESS_MESSAGE, 
    SUCCESS_VARIANT, 
    ERROR_TITLE, 
    ERROR_VARIANT, 
    showNotification, 
    PROPERTY_OBJECT,
    ACTION_TYPE_INSERT } from 'c/utils';

import propertyRecordTypes from './propertyRecordTypes.html';
import propertyFields from './propertyFields.html';

export default class PropertyCreation extends LightningElement {
    
    propertyRecordType;
    showPropertyTypePicker = true;
    showPropertyFields = false;
    isDisabledAddButton = false;
    isDisabledDeleteButton = true;
    keyIndex = 0;

    @api recordId;
    @api objectApiName;
    @track elements = [{ id: 0 }];

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

    render() {
        if (this.showPropertyTypePicker) return propertyRecordTypes;
        else if (this.showPropertyFields) return propertyFields;
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
        this.showPropertyTypePicker = false;
        this.showPropertyFields = true;
    }

    addRow() {
        if (this.elements.length < 3) {
            ++this.keyIndex;
            let newItem = { id: this.keyIndex };
            this.elements.push(newItem);

            if (this.elements.length > 1) {
                this.isDisabledDeleteButton = false;
            }

            if (this.elements.length > 2) {
                this.isDisabledAddButton = true;
            }
        }
    }

    deleteRow(event) {
        if (this.elements.length > 1) {
            this.elements = this.elements.filter(function (element) {
                return element.id != parseInt(event.target.accessKey);
            });

            if (this.elements.length < 2) {
                this.isDisabledDeleteButton = true;
            }

            if (this.elements.length < 3) {
                this.isDisabledAddButton = false;
            }
        }
    }

    handleCancel() {
        this.keyIndex = 0;
        this.elements = [{ id: 0 }];
        this.showPropertyTypePicker = true;
        this.showPropertyFields = false;
    }

    handleSubmit() {
        let isPropertyValid = true;
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            isPropertyValid = isPropertyValid && element.reportValidity();
        });

        if (isPropertyValid) {
            let description = `${this.elements.length} records with record type \"${this.propertyRecordType}\"`;
            let errorMessage = '';

            try {
                this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
                    element.submit();
                });
                showNotification(this, SUCCESS_TITLE, SUCCESS_MESSAGE, SUCCESS_VARIANT);
                this.handleCancel();
            } catch(error) {
                showNotification(this, ERROR_TITLE, error.getMessage(), ERROR_VARIANT);
                this.errorMessage = error.message;
            } finally {
                this.createLog(ACTION_TYPE_INSERT, description, errorMessage);
            }
        } 
    }

    createLog(actionType, description, errorMessage) {
        
        const wrapperForLWClog = {
            objectType: PROPERTY_OBJECT.objectApiName, 
            actionType: actionType,
            description: description,
            errorMessage: errorMessage
        };
        createLogLWC({ wrapper: wrapperForLWClog });
    }
}