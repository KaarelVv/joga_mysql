class BaseController {
    handleError(res, error, message = 'Internal Server Error', status = 500) {
        console.error(error)
        res.status(status).send(message)
    }
}

module.exports = BaseController
