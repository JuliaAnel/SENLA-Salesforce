import { LightningElement, api } from 'lwc';
import PROPERTY_IMAGE from 'c/utils';
export default class PropertyItem extends LightningElement {
	@api property;
    imgUrl = PROPERTY_IMAGE;

	elementClick() {
        const event = new CustomEvent('elementselected', {
            detail: this.property.Id
        });
        this.dispatchEvent(event);
    }
}