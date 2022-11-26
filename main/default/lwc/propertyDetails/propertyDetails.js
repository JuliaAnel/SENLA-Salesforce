import { LightningElement,api } from 'lwc';

export default class PropertyDetails extends LightningElement {

    property;
    propertyId = undefined;

    set propertyId(value) {
        this.propertyId = value;
        this.property = properties.find(elem => elem.Id === value);
    }
    
    @api get propertyId(){
        return this.propertyId;
    }
}