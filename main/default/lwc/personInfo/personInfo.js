import { LightningElement } from 'lwc'
import { PEOPLE, COLUMNS, OPTIONS, SORT_BY, GENDER_MALE, GENDER_FEMALE, ELEMENT_TYPE_CHECKBOX, VALUE } from 'c/utils'

export default class personInfo extends LightningElement {

	people = PEOPLE
	columns = COLUMNS
	value = SORT_BY

	optionsGender = [
		{ label: 'Male', value: GENDER_MALE, checked: null },
		{ label: 'Female', value: GENDER_FEMALE, checked: null },
	]

  	get options() {
		return OPTIONS
	}

  	handleSortBy(event) {
    	this.value = event.detail.value;
    	const resultSort = JSON.parse(JSON.stringify(this.people)).sort((a, b) =>
      	a[event.detail.value].localeCompare(b[event.detail.value])
    	);
    	this.people = resultSort;
  	}
 
  	handleChangeFrom(event) {
    	const selectedFromDate = new Date(event.detail.value);
    	const resultFromDate = this.people.filter((item) => {
      	return new Date(item.birthday) >= selectedFromDate;
    	});
    	this.people = resultFromDate;
  	}

  	handleChangeTo(event) {
    	const selectedToDate = new Date(event.detail.value);
    	const resultToDate = this.people.filter((item) => {
      	return new Date(item.birthday) <= selectedToDate;
    	});
    	this.people = resultToDate;
  	}

  	handleChangeGender(e) {
    	const valueGender = e.target.name;
    	if (valueGender === GENDER_MALE) {
      		this.optionsGender[0].checked = true;
      		this.optionsGender[1].checked = false;
    	} else {
      		this.optionsGender[1].checked = true;
      		this.optionsGender[0].checked = false;
    	}
    	const resultFilterByGender = this.people.filter((item) => {
      	return item.gender === valueGender;
    	});
    	this.people = resultFilterByGender;
  	}

  	handleChangeEmail(event) {
    	const resultFilterByEmail = this.people.filter((item) => {
      	return item.email
        	.toLowerCase()
        	.includes(event.target.value.toLowerCase());
    	});
    	this.people = resultFilterByEmail;
  	}

  	handleReset() {
    	this.value = VALUE;
    	this.template.querySelectorAll("lightning-input").forEach((element) => {
      	if (element.type === ELEMENT_TYPE_CHECKBOX) {
        	element.checked = false;
      	} else {
        	element.value = null;
      	}
      	this.people = people;
    	});
  	}
}
