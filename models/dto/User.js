class User{
    constructor(user){
        if (
            typeof user.username !== 'undefined' &&
            typeof user.email !== 'undefined' &&
            typeof user.password !== 'undefined'
        ){
            this.username = user.username;
            this.email = user.email;
            this.password = user.password;
        }else{
            return undefined;
        }
    }

    getData(){
        const usuario = {
            username: this.username,
            email: this.email
        }
        return usuario;
    }
}

module.exports = User;