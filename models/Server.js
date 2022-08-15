require('dotenv/config');
const fastify = require('fastify')({ logger: false });
const userRouter = require("../routes/userRoutes.js");

class Server{
    constructor() {
        this.PORT = process.env.PORT || 8080;
        this.app = fastify;
    }

    start(){
        this.app.register(userRouter);

        this.app.listen({port: this.PORT}, (err) => {
            if (err) {
                this.app.log.error(err);
                process.exit(1);
            }
            console.log('Servidor iniciado.', this.PORT);
        })
    }
}

module.exports = Server;