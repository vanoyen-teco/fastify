const userController = require("../controllers/userController");

const router = (instance, opts, done)=>{
    instance.get('/user/:id', userController.getUser)
    instance.post('/user/add', userController.addUser)
    instance.post('/user/update', userController.updateUser)
    instance.get('/user/delete/:id', userController.deleteUser)
    done()
};

module.exports = router;