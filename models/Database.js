class Database{
    constructor(daoType){
        this.db = require(`./dao/user${daoType}`);
    }
}

module.exports = Database;