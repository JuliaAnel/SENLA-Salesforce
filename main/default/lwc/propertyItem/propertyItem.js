import { LightningElement, api } from 'lwc';
export default class PropertyItem extends LightningElement {
	@api propertyItem;

	propertyClick() { 
        const event = new CustomEvent('propertyselected', {
            detail: this.propertyItem
        });
        this.dispatchEvent(event);
    }
}