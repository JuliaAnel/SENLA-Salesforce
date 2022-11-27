import { LightningElement, wire, track } from 'lwc';
import getPropertiesCount from '@salesforce/apex/PropertyController.getPropertiesCount';
import getProperties from '@salesforce/apex/PropertyController.getProperties';
import {PAGE_SIZE, PROPERTY_FIELDS} from 'c/utils';

export default class PropertyList extends LightningElement {
    errorItem;
    spinner = true;
    hasError = false;
	selectedProperty;
    pageNumber = 1;
    pageSize = PAGE_SIZE;
    @track 
    propertiesArray = [];

    recordsCount = 0;

    @wire(getPropertiesCount)
    recordCount({ error, data }) {
        if (data) {
            this.recordsCount = data;
            this.spinner = false;
        }
        else if (error) {
            this.hasError = true;
            this.errorItem = {header: 'Get properties count error', message: error.message};
            this.recordsCount = 0;
        }
    }

    @wire(getProperties, { fields: PROPERTY_FIELDS.join(", "), pageNumber: '$pageNumber' })
    properties({ error, data }) {
        if (data) {
            this.propertiesArray = data;
    }   
        else if (error) { 
             this.hasError = true;
             this.errorItem = {header: 'Get properties error', message: error.message};
             this.propertiesArray = [];
        }
    }    

	handlePropertySelected(evt) {
        console.log(evt.detail);
        this.selectedProperty = evt.detail;
    }

	handlePreviousPage() {
        this.spinner = true;
        this.pageNumber = this.pageNumber - 1;
		this.getDataForPage(this.pageNumber);
        
    }

    handleNextPage() {
        this.spinner = true;
        this.pageNumber = this.pageNumber + 1;
		this.getDataForPage(this.pageNumber);
    }

	getDataForPage(currentPageNumber){
        getProperties({ fields: PROPERTY_FIELDS.join(", "), pageNumber: currentPageNumber })
            .then(result => {
                this.propertiesArray = result;
                this.spinner = false;
            })
            .catch(error => {
                this.hasError = true;
                this.errorItem = {header: 'Get properties error', message: error.message};
                this.propertiesArray = [];
            });
	}
}