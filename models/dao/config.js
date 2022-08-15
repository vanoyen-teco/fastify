require('dotenv/config');

const mongoDbConfig = {
    connectString: process.env.MONGO_STRING,
}


module.exports = {
    mongoDbConfig,
};