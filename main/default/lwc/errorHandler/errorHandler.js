import { LightningElement, api } from 'lwc';
import ERROR_HEADER from 'salesforce/label/c.Error_for_property';

export default class ErrorHandler extends LightningElement {
    @api
    errorItem;
    errorHeader = ERROR_HEADER;
}