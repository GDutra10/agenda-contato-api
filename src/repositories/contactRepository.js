const Contact = require('../models/contact');

module.exports = class ContactRepository{

    constructor(){
        this.lastId = 0;
        this.contactArray = [];
    }

    getAll(){
        return this.contactArray;
    }

    get(id){
        return this.contactArray.filter(contact => {
            return contact.id === Number(id);
        })[0];
    }

    insert(contact){
        this.contactArray.push(contact);
        contact.id = this.lastId + 1;
        contact.dtRegister = new Date().toLocaleString();
        this.lastId++;
    }

    update(contact){
        let contactUpdate = this.get(contact.id);

        contactUpdate.name = contact.name;
        contactUpdate.dtBirth = contact.dtBirth;
        contactUpdate.nuPhone = contact.nuPhone;
    }

    delete(id){
        let index = this.contactArray.findIndex(cont => cont.id == id);
        this.contactArray.splice(index, 1);
    }

}