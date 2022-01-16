
const Employee = require('./Employee')

class Manager {
    constructor (name, id, email, office){
        this.name = name;
        this.id = id;
        this.email = email;
        this.office = office;
    }

    getOffice(){
        return this.office;
    }

    getRole(){
        return "Manager";
    }

}

module.exports = Manager;