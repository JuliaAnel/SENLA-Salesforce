import { LightningElement, wire, track } from 'lwc';
import getLogsLWC from '@salesforce/apex/LogLWCController.getLogsLWC';
import { LOG_LWC_FIELDS, LOG_LWC_COLUMNS } from 'c/utils';

export default class LogLWCTable extends LightningElement {
    columns = LOG_LWC_COLUMNS;
    
    @track records = [];

    @wire(getLogsLWC, { fields: LOG_LWC_FIELDS })
    logsList({ error, data }) {
        if (data) {
            this.records = this.sortByDesc(data);
        }
        else if (error) {
            this.records = [];
        }
    }

    sortByDesc(data) {
        let parseData = JSON.parse(JSON.stringify(data));
        return parseData.sort((a, b) => new Date(a.CreatedDate) > new Date(b.CreatedDate) ? -1 : 1);
    }
}