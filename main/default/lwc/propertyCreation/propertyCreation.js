import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PropertyCreation extends LightningElement {
    @api recordId;
    keyIndex = 0;
    
    @track elements = [{ id: 0 }];

    addRow() {
        if (this.itemList.length < 3) {
            ++this.keyIndex;
            let newItem = { id: this.keyIndex };
            this.itemList.push(newItem);

            if (this.itemList.length == 2) {
                Array.from(this.template.querySelectorAll('lightning-button-icon[name="delete"]')).forEach(element => {
                    element.disabled = false;
                });
            }

            if (this.itemList.length == 3) {
                Array.from(this.template.querySelectorAll('lightning-button-icon[name="add"]')).forEach(element => {
                    element.disabled = true;
                });
            }
        }
    }

    deleteRow(event) {
        if (this.itemList.length > 1) {
            this.itemList = this.itemList.filter(function (element) {
                return element.id != parseInt(event.target.accessKey);
            });

            if (this.itemList.length == 1) {
                this.template.querySelector('lightning-button-icon[name="delete"]').disabled = true;
            }

            if (this.itemList.length == 2) {
                Array.from(this.template.querySelectorAll('lightning-button-icon[name="add"]')).forEach(element => {
                    element.disabled = false;
                });
            }
        }
    }

    handleSubmit() {
        let isVal = true;
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            isVal = isVal && element.reportValidity();
        });
        if (isVal) {
            try {
                this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
                    element.submit();
                });

                this.displaySuccess();
                this.handleCancel();
            } catch(error) {
                this.displayError(error);
            }
        } 
    }
    handleCancel() {
        this.keyIndex = 0;
        this.elements = [{ id: 0 }];

        this.dispatchEvent(new CustomEvent("recordtypesubmit", {
            detail: {
                isPropertyRecordTypeSubmitted: false,
            }
        }));
    }

    displaySuccess() {
        const toastEvent = new ShowToastEvent({
            title: "Property creation",
            message: "Property is successfully created",
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }

    displayError(error) {
        const toastEvent = new ShowToastEvent({
            title: "Property is not created",
            message: error.getMessage(),
            variant: "destructive"
        });
        this.dispatchEvent(toastEvent);
    }
}