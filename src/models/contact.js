module.exports = class Contact{

    constructor(name, dtBirth, nuPhone){
        this.id = -1;
        this.name = name;
        this.dtBirth = dtBirth;
        this.nuPhone = nuPhone;
        this.dtRegister = Date.now();
    }
}