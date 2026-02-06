class Server {
    constructor(app, port) {
        this.app = app
        this.port = port
    }

    start(callback) {
        this.app.listen(this.port, callback)
    }
}

module.exports = Server
