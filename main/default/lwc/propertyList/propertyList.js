import { LightningElement, wire } from 'lwc';
import getPropertiesCount from '@salesforce/apex/PropertyController.getPropertiesCount';
import getAllProperties from '@salesforce/apex/PropertyManager.getAllProperties';
import {PAGE_SIZE, PROPERTY_FIELDS} from 'c/utils';

export default class PropertyList extends LightningElement {

    @wire(getPropertiesCount)
    recordsCount;

	@wire(getAllProperties,{ fields:PROPERTY_FIELDS })
	properties;

	selectedElementId;
    pageNumber = 1;
    pageSize = PAGE_SIZE;

	connectedCallback() {
		this.getDataForPage(this.pageNumber);
	}

	handleElementSelected(evt) {
        this.selectedElementId = evt.detail;
    }

	handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
		this.getDataForPage(this.pageNumber);
    }

    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
		this.getDataForPage(this.pageNumber);
    }

	getDataForPage(pageNumber){
		const indexFrom = (pageNumber - 1) * PAGE_SIZE;
		const indexTo = pageNumber * PAGE_SIZE > recordsCount ? recordsCount : pageNumber * PAGE_SIZE;

		this.properties = properties.slice(indexFrom, indexTo);
	}
}