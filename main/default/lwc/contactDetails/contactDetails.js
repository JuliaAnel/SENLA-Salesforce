import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import {  CONTACT_ID } from 'c/utils';

export default class ContactDetails extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: CONTACT_ID })
    contact;
    
}