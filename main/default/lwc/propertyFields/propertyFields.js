import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PropertyCreation extends LightningElement {
    @api recordId;
    keyIndex = 0;

    isDisabledAddButton = false;
    isDisabledDeleteButton = true;

    @track elements = [{ id: 0 }];

    addRow() {
        if (this.elements.length < 3) {
            ++this.keyIndex;
            let newItem = { id: this.keyIndex };
            this.elements.push(newItem);

            if (this.elements.length == 2) {
                this.isDisabledDeleteButton = false;
            }

            if (this.elements.length == 3) {
                this.isDisabledAddButton = true;
            }
        }
    }

    deleteRow(event) {
        if (this.elements.length > 1) {
            this.elements = this.elements.filter(function (element) {
                return element.id != parseInt(event.target.accessKey);
            });

            if (this.elements.length == 1) {
                this.isDisabledDeleteButton = true;
            }

            if (this.elements.length == 2) {
                this.isDisabledAddButton = true;
            }
        }
    }

    handleSubmit() {
        let isPropertyValid = true;
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            isPropertyValid = isPropertyValid && element.reportValidity();
        });
        if (isPropertyValid) {
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

        this.dispatchEvent(new CustomEvent("recordcreation", {
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