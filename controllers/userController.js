require('dotenv/config');
const userService = require("../models/userService");

const dbSelected = process.env.DB || 'MongoDb';
const service = new userService(dbSelected);

const getUser = (request, reply) => {
    if(!request.params.id){
        reply.status(400).send({ status: "Bad Request", data: {error: "Id no recibido"} });
    }
    const getUserByID = service.getUserById(request.params.id);
    getUserByID
    .then( (response) => {
        if(response.username){
            reply.status(200).send({ status: "OK", data: response })
        }else{
            reply.status(400).send({ status: "FAILED", data: {error: "El Usuario no existe"} });
        }
    })
};

const addUser = (request, reply) => {
    const { body } = request;
    if (
        !body.username ||
        !body.email ||
        !body.password 
    ) {
        reply
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const newUser = {
        username: body.username,
        email: body.email,
        password: body.password,
    };
    const createdUser = service.createNewUser(newUser);
    (createdUser)
    ?reply.status(201).send({ status: "OK", data: createdUser })
    :reply.status(400).send({ status: "FAILED", data: {error: "Lo sentimos, no pudimos agregar el elemento."} });
};

const updateUser = (request, reply) => {
    const { body } = request;
    if (
        !body.username ||
        !body.email ||
        !body.password ||
        !body.id
    ) {
        reply
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const user = {
        id: body.id,
        username: body.username,
        email: body.email,
        password: body.password,
    };
    const updatedUser = service.updateUser(body.id ,user);
    (updatedUser)
    ?reply.status(201).send({ status: "OK", data: updatedUser })
    :reply.status(400).send({ status: "FAILED", data: {error: "Lo sentimos, no pudimos agregar el elemento."} });
};

const deleteUser = (request, reply) => {
    if(!request.params.id){
        reply
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const deletedUser = service.removeUser(request.params.id);
    deletedUser.then((del)=>{
        (del)
        ?reply.status(200).send({ status: "OK", data: del })
        :reply.status(404).send({ status: "NOT FOUND", data: {error: "Lo sentimos, no encontramos el producto."} })
    })    
};

module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser
};