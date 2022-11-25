import { LightningElement, track } from 'lwc'
import { PEOPLE, COLUMNS, OPTIONS, GENDER_MALE, GENDER_FEMALE, RADIO, VALUE } from 'c/utils'

export default class personInfo extends LightningElement {

	people = PEOPLE
	columns = COLUMNS
	value = VALUE
	sortby = undefined
	from = undefined
	to = undefined
	gender = undefined
	email = undefined
	@track selectedgender = ''

	optionsGender = [
		{ label: 'Male', value: GENDER_MALE },
		{ label: 'Female', value: GENDER_FEMALE},
	]

  	get options() {
		return OPTIONS
	}

  	handleSortBy(event) {
    	this.value = event.detail.value;
		this.fullSorted();
  	}
 
	sortBy(value) {
		this.people = JSON.parse(JSON.stringify(this.people)).sort((a, b) =>
      	a[value].localeCompare(b[value])
    	);
	}

  	handleChangeFrom(event) {
    	this.from = new Date(event.detail.value);
		this.fullSorted();
  	}

	sortedFrom(from) {
		this.people = this.people.filter((item) => {
			return new Date(item.birthday) >= from;
		  });
	}

  	handleChangeTo(event) {
    	this.to = new Date(event.detail.value);
		this.fullSorted();
  	}

	sortedTo(to) {
		this.people = this.people.filter((item) => {
			return new Date(item.birthday) <= to;
		  });
	}

	  handleChangeGender(e) {
		this.gender = e.detail.value;
		this.fullSorted();
  	}

	sortedGender(gender) {
		this.people = this.people.filter((item) => {	
			return gender == item.gender;
		  });
	}

  	handleChangeEmail(event) {
		this.email = event.target.value.toLowerCase();
		this.fullSorted();
  	}

	sortedEmail(email) {
		this.people = this.people.filter((item) => {
			return item.email
			  .toLowerCase()
			  .includes(email);
		  });
	}

	fullSorted() {
		this.people = PEOPLE;

		if(this.from != undefined) {
			this.sortedFrom(this.from);
		}
		if(this.to != undefined) {
			this.sortedTo(this.to);
		}
		if(this.gender != undefined) {
			this.sortedGender(this.gender);
		}
		if(this.email != undefined) {
			this.sortedEmail(this.email);
		}
		if(this.value != VALUE) {
			this.sortBy(this.value);
		}
	}

  	handleReset() {
    	this.value = VALUE;
    	this.template.querySelectorAll("lightning-input").forEach((element) => {
      	if (element.type === RADIO) {
        	element.checked = false;
      	} else {
        	element.value = null;
      	}
      	this.people = PEOPLE;
		this.selectedgender = undefined;
		this.from = undefined;
		this.to = undefined;
		this.gender = undefined;
		this.email = undefined;
    	});
  	}
}