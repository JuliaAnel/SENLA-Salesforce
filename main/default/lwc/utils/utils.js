import { ShowToastEvent } from "lightning/platformShowToastEvent";
import CREATED_DATE from "@salesforce/schema/LogLWC__c.CreatedDate";
import PROPERTY_OBJECT from '@salesforce/schema/Property__c';
import OWNER_FIRST_NAME from '@salesforce/schema/Property__c.Property_Owner__r.FirstName';
import OWNER_LAST_NAME from '@salesforce/schema/Property__c.Property_Owner__r.LastName';
import OWNER_PHONE from '@salesforce/schema/Property__c.Property_Owner__r.Phone';
import OWNER_HOME_PHONE from '@salesforce/schema/Property__c.Property_Owner__r.HomePhone';
import OWNER_EMAIL from '@salesforce/schema/Property__c.Property_Owner__r.Email';
import OWNER_TOTAL_PROPERTY_PRICE from '@salesforce/schema/Property__c.Property_Owner__r.Total_Property_Price__c';
import PROPERTY_OWNER from '@salesforce/schema/Property__c.Property_Owner__c';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

const SUCCESS_TITLE = "Property creation";
const SUCCESS_MESSAGE = "Property is successfully created";
const SUCCESS_VARIANT = "success";
const ERROR_TITLE = "Property is not created";
const ERROR_VARIANT = "destructive";
const STANDARD_RECORD_PAGE = 'standard__recordPage';
const PAGE_ACTION_NAME_VIEW = 'view';
const ELEMENT_TYPE_CHECKBOX = 'checkbox';
const SORT_BY = 'sortBy';
const GENDER_MALE = 'MALE';
const GENDER_FEMALE = 'FEMALE';
const LOG_LWC_FIELDS = 'ObjectType__c, ActionType__c, Description__c, IsSuccessful__c, ErrorMessage__c, CreatedDate';
const PROPERTY_OWNER_FIELDS = [OWNER_FIRST_NAME, OWNER_LAST_NAME, OWNER_PHONE, OWNER_HOME_PHONE, OWNER_EMAIL, OWNER_TOTAL_PROPERTY_PRICE, PROPERTY_OWNER];

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
 
const LOG_LWC_COLUMNS = [
  	{ label: "Object Type", fieldName: "ObjectType__c" },
  	{ label: "Action Type", fieldName: "ActionType__c" },
  	{ label: "Description", fieldName: "Description__c" },
  	{ label: "Is Successful", fieldName: "IsSuccessful__c" },
  	{ label: "Error Message", fieldName: "ErrorMessage__c" },
  	{ label: "Created Date", fieldName: "CreatedDate", type: "date" }
];

export {
	OPTIONS, 
	PEOPLE, 
	COLUMNS, 
	SUCCESS_TITLE,
	SUCCESS_MESSAGE, 
	SUCCESS_VARIANT,
	ERROR_TITLE, 
	ERROR_VARIANT, 
	showNotification, 
	PAGE_ACTION_NAME_VIEW,
	STANDARD_RECORD_PAGE,
	LOG_LWC_FIELDS, 
	LOG_LWC_COLUMNS,
	CREATED_DATE,
	ELEMENT_TYPE_CHECKBOX,
	SORT_BY,
	GENDER_MALE,
	GENDER_FEMALE,
	PROPERTY_OBJECT,
    OWNER_FIRST_NAME,
    OWNER_LAST_NAME,
    OWNER_PHONE,
    OWNER_HOME_PHONE,
    OWNER_EMAIL,
    OWNER_TOTAL_PROPERTY_PRICE,
    PROPERTY_OWNER,
    CONTACT_OBJECT,
    PROPERTY_OWNER_FIELDS
    };

