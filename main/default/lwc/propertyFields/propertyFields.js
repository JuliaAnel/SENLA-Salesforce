import { LightningElement, api, track } from 'lwc';
import { showNotification, SUCCESS_TITLE, SUCCESS_MESSAGE, SUCCESS_VARIANT, ERROR_TITLE, ERROR_VARIANT } from 'c/utils';

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
                showNotification(this, SUCCESS_TITLE, SUCCESS_MESSAGE, SUCCESS_VARIANT);
                this.handleCancel();
            } catch(error) {
                showNotification(this, ERROR_TITLE, error.getMessage(), ERROR_VARIANT);
            }
        } 
    }
    handleCancel() {
        this.keyIndex = 0;
        this.elements = [{ id: 0 }];

        this.dispatchEvent(new CustomEvent("recordcreation", {
        }));
    }
}