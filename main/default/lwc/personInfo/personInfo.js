import { LightningElement } from 'lwc'

const people = [
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
   
const columns = [
	{ label: 'Last Name', fieldName: 'lastName', type: 'text' },
	{ label: 'First Name', fieldName: 'firstName', type: 'text'},
	{ label: 'Gender', fieldName: 'gender' , type: 'text'},
	{ label: 'Birthday', fieldName: 'birthday', type: 'date' },
	{ label: 'Email', fieldName: 'email', type: 'email' },
]

export default class personInfo extends LightningElement {
	people = people
	columns = columns
	value = 'sortBy'
	optionsGender = [
		{ label: 'Male', value: 'MALE', checked: null },
		{ label: 'Female', value: 'FEMALE', checked: null },
	]

	get options() {
		return [
			{ label: 'First Name', value: 'firstName' },
			{ label: 'Last Name', value: 'lastName' },
			{ label: 'Email', value: 'email' },
		]
	}

	handleChange(event) {
		this.value = event.detail.value
		const result = JSON.parse(JSON.stringify(this.persons)).sort((a, b) => a[event.detail.value].localeCompare(b[event.detail.value]))
		this.people = result
	}

	handleChangeFrom(event){
		const choosedDate = new Date(event.detail.value)
		const result = this.persons.filter(item => {
			return new Date(item.birthday) >= choosedDate
		})
		this.persons = result
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
		if (valueGender === 'MALE') {
			this.optionsGender[1].checked = 0
			this.optionsGender[0].checked = 1
		} else{
				this.optionsGender[0].checked = 0
				this.optionsGender[1].checked = 1
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
			if (element.type === 'checkbox'){
				element.checked = false
			} else {
				element.value = null
			}
			this.people = people
		})
	}

}

