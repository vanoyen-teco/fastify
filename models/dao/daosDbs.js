require('dotenv/config');

class daosDbs {
    constructor(){
        this.dbTypes = ['MongoDb'];
    }

    isDbType(name){
        return this.dbTypes.includes(name);
    }
}

module.exports = daosDbs;