import { ShowToastEvent } from "lightning/platformShowToastEvent";
import PROPERTY_OBJECT from '@salesforce/schema/Property__c';
import OWNER_FIRST_NAME from '@salesforce/schema/Property__c.Property_Owner__r.FirstName';
import OWNER_LAST_NAME from '@salesforce/schema/Property__c.Property_Owner__r.LastName';
import OWNER_PHONE from '@salesforce/schema/Property__c.Property_Owner__r.Phone';
import OWNER_HOME_PHONE from '@salesforce/schema/Property__c.Property_Owner__r.HomePhone';
import OWNER_EMAIL from '@salesforce/schema/Property__c.Property_Owner__r.Email';
import OWNER_TOTAL_PROPERTY_PRICE from '@salesforce/schema/Property__c.Property_Owner__r.Total_Property_Price__c';
import PROPERTY_OWNER from '@salesforce/schema/Property__c.Property_Owner__c';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import { NavigationMixin } from 'lightning/navigation';

const SUCCESS_TITLE = "Property creation";
const SUCCESS_MESSAGE = "Property is successfully created";
const SUCCESS_VARIANT = "success";
const ERROR_TITLE = "Property is not created";
const ERROR_VARIANT = "destructive";
const STANDARD_RECORD_PAGE = 'standard__recordPage';
const PAGE_ACTION_NAME_VIEW = 'view';
const RADIO = 'radio';
const GENDER_MALE = 'MALE';
const GENDER_FEMALE = 'FEMALE';

const PEOPLE = [
	{Id:1, lastName: 'Rush', firstName: 'Stefania', gender: 'FEMALE', birthday: '10.09.2005', email: 'Stefania@com'},
	{Id:2, lastName:'Hughie', firstName: 'Simon', gender: 'MALE', birthday: '11.02.1985', email: 'Hughie@com'},
	{Id:3, lastName: 'French', firstName: 'Lidia', gender: 'FEMALE', birthday: '10.09.1999', email: 'Lidia@com'},
	{Id:4, lastName: 'Misbah', firstName: 'Chen', gender: 'MALE', birthday: '08.03.1995', email: 'Misbah@com'},
	{Id:5, lastName: 'Jones', firstName: 'Eva', gender: 'FEMALE', birthday: '04.04.1994', email: 'Jones@com'},
	{Id:6, lastName: 'Garcia', firstName: 'Liam', gender: 'MALE', birthday: '06.07.1992', email: 'Garcia@com'},
	{Id:7, lastName: 'Bannister', firstName: 'Israr', gender: 'MALE', birthday: '11.08.1975', email: 'Bannister@com'},
	{Id:8, lastName: 'Davis', firstName: 'James', gender: 'MALE', birthday: '12.05.1976', email: 'Davis@com'},
	{Id:9, lastName: 'Bellamy', firstName: 'Mariah', gender: 'MALE', birthday: '12.02.1982', email: 'Bellamy@com'},
	{Id:10, lastName: 'Wilson', firstName: 'Emma', gender: 'FEMALE', birthday: '08.07.1993', email: 'Wilson@com'},
	{Id:11, lastName: 'England', firstName: 'Ellise', gender: 'FEMALE', birthday: '12.09.1979', email: 'England@com'},
	{Id:12, lastName: 'King', firstName: 'Nida', gender: 'FEMALE', birthday: '01.06.1991', email: 'King@com'},
]
   
const COLUMNS = [
	{ label: 'Last Name', fieldName: 'lastName', type: 'text' },
	{ label: 'First Name', fieldName: 'firstName', type: 'text'},
	{ label: 'Gender', fieldName: 'gender' , type: 'text'},
	{ label: 'Birthday', fieldName: 'birthday', type: 'date' },
	{ label: 'Email', fieldName: 'email', type: 'email' },
]

const OPTIONS = [
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
    { label: 'Email', value: 'email' },
];

const showNotification = (page, title, message, variant) => {
	const toastEvent = new ShowToastEvent({
	  title,
	  message,
	  variant
	});
	page.dispatchEvent(toastEvent);
  };

  function navigateTo(fromPage, type, recordId, objectApiName, actionName) {
    fromPage[NavigationMixin.Navigate]({
        type: type,
        attributes: {
            recordId: recordId,
            objectApiName: objectApiName,
            actionName: actionName,
        },
    });
}

export {OPTIONS,
	 	PEOPLE, 
	 	COLUMNS,
		PROPERTY_OBJECT,
		SUCCESS_TITLE,
		SUCCESS_MESSAGE,
		SUCCESS_VARIANT,
		ERROR_TITLE,
		ERROR_VARIANT,
		STANDARD_RECORD_PAGE,
		PAGE_ACTION_NAME_VIEW,
		RADIO,
		GENDER_MALE,
		GENDER_FEMALE,
		showNotification,
        OWNER_FIRST_NAME,
        OWNER_LAST_NAME,
        OWNER_PHONE,
        OWNER_HOME_PHONE,
        OWNER_EMAIL,
        OWNER_TOTAL_PROPERTY_PRICE,
        PROPERTY_OWNER,
        CONTACT_OBJECT,
		navigateTo};