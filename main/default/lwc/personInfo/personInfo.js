import { LightningElement } from 'lwc';
import { PEOPLE, COLUMNS, OPTIONS, ELEMENT_TYPE_CHECKBOX, SORT_BY, GENDER_MALE, GENDER_FEMALE } from 'c/utils';

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
		SORT_BY = event.detail.value
		const result = JSON.parse(JSON.stringify(this.people)).sort((a, b) => a[event.detail.value].localeCompare(b[event.detail.value]))
		this.people = result
	}

	handleChangeFrom(event){
		const choosedDate = new Date(event.detail.value)
		const result = this.people.filter(item => {
			return new Date(item.birthday) >= choosedDate
		})
		this.people = result
	}

	handleChangeTo(event){
		const choosedDate = new Date(event.detail.value)
		const result = this.people.filter(item => {
			return new Date(item.birthday) <= choosedDate
		})
		this.people = result
	}

	handleChangeGender(e){
		const valueGender = e.target.name
		if (valueGender === GENDER_MALE) {
			this.optionsGender[0].checked = true
			this.optionsGender[1].checked = false
		} else{
				this.optionsGender[1].checked = true
				this.optionsGender[0].checked = false
			}
		const result = people.filter(item => {
		return item.gender === valueGender
		})
		this.people = result
	}

	handleChangeEmail(event){
		const result = people.filter(item => {
			return item.email.toLowerCase().includes(event.target.value.toLowerCase())
		})
		this.people = result
	}

	handleReset(){
		this.value = ''
		this.template.querySelectorAll('lightning-input').forEach(element => {
			if (element.type === ELEMENT_TYPE_CHECKBOX){
				element.checked = false
			} else {
				element.value = null
			}
			this.people = people
		})
	}

}

