const mongoose = require('mongoose');

const { mongoDbConfig } = require("./config");
const url = mongoDbConfig.connectString;

mongoose.connect(url)
.catch( (err) => {
    console.error(`Error connecting to the database. n${err}`);
})

mongoose.connection;
const Schema = mongoose.Schema;
const UserModelSchema = new Schema({
    username: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    id: String
});
const UserModel = mongoose.model('usuario', UserModelSchema );


async function get(){
    const querySnapshot = await UserModel.find();
    return querySnapshot;
}

async function getById(userId){
    const query = await UserModel.findOne({ id: userId });
    return query;
}

async function add(newUser){
    let id;
    const resUser = await UserModel.create({ username: newUser.username, email: newUser.email, password: newUser.password  });
    if (resUser._id){
        id = resUser._id;
    }else{
        id = false;
    }
    if(id){
        const doc = await UserModel.findOne({ _id: id });
        let resUser = {...newUser};
        resUser.id = id;
        doc.overwrite(resUser);
        const data = await doc.save();
        return data;
    }else{
        return false;
    }
}

async function update(userId, changes){
    const doc = await UserModel.findOne({ id: userId });
    let updateupdateUser = {...changes};
    updateupdateUser.id = userId;
    doc.overwrite(updateupdateUser);
    const data = await doc.save();
    return data;
}

async function remove(userId){
    return await UserModel.deleteOne({ id: userId });
}

module.exports = {
    get,
    getById,
    add,
    update,
    remove,
};