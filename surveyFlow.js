import { LightningElement, api, track } from 'lwc';
import {
    FlowAttributeChangeEvent,
    FlowNavigationNextEvent,
} from 'lightning/flowSupport';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone'},
    { label: 'Department', fieldName: 'Department'},
    { label: 'Description', fieldName: 'Description'}
];

export default class ContactList extends LightningElement {
    @api contacts = [];
    @api sentContacts = [];
    @api emailsCollection = [];
    @track columns = columns;
    
    handleChange(){
        const attributeChangeEvent = new FlowAttributeChangeEvent();
        this.dispatchEvent(attributeChangeEvent);
    }

    getSelectedRec() {
        var allRecords =  this.template.querySelector("lightning-datatable");
        var selectedRecords = allRecords.getSelectedRows();
        if(selectedRecords.length > 0){
            this.sentContacts = selectedRecords;

            selectedRecords.forEach(currentItem => {
                this.emailsCollection.push(currentItem.Email);
            });
            alert('Surveys sent to the selected contacts.');
            console.log(this.emailsCollection);
            const navigateNextEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateNextEvent);
        }   
      }
}