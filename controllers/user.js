const baseController = require('./base')
const bcrypt = require('bcrypt')

class UserController extends baseController {
    constructor(userModel) {
        super()
        this.userModel = userModel
    }

    async getUserById(req, res) {
        try {
            const user = await this.userModel.findById(req.params.id)
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.status(200).json(user)
        } catch (error) {
            this.handleError(res, error, 'Failed to fetch user', 500)
        }
    }

    async createUser(req, res) {
        try {
            const cryptedPassword = await bcrypt.hash(req.body.password, 10)
            const createdUserId = await this.userModel.create({
                username: req.body.username,
                email: req.body.email,
                password: cryptedPassword
            })
            res.status(201).json({ id: createdUserId })
        } catch (error) {
            this.handleError(res, error, 'Failed to create user', 500)
        }
    }

    async updateUser(req, res) {
        try {
            const updatedRows = await this.userModel.update(req.params.id, req.body)
            if (!updatedRows) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.status(200).json({ message: 'User updated successfully' })
        } catch (error) {
            this.handleError(res, error, 'Failed to update user', 500)
        }
    }

    async register(req, res) {
        try {
            const { username, email, password } = req.body
            const errors = []

            if (!username || !email || !password) {
                errors.push('All fields are required.')
            }

            const existingUser = await this.userModel.findByUsername(username)

            if (existingUser) {
                errors.push('This username is already registered.')
            }
            if (password.length < 6) {
                errors.push('Password must be at least 6 characters long.')
            }
            if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) {
                errors.push('Password must contain at least one uppercase letter, one lowercase letter, and one number.')
            }

            if (errors.length > 0) {
                return res.status(400).render('auth/register', {
                    errors,
                    form: { username, email }
                })
            }


            const cryptedPassword = await bcrypt.hash(password, 10)
            const registeredUserId = await this.userModel.create({
                username,
                email,
                password: cryptedPassword
            })

            const userData = await this.userModel.findById(registeredUserId)
            req.session.user = {
                id: userData.id,
                username: userData.username,
            }

            res.redirect('/articles')
        } catch (error) {
            this.handleError(res, error, 'Failed to register user', 500)
        }
    }

    async login(req, res) {
        try {
            const { username, email, password } = req.body

            const user = await this.userModel.findByUsername(username)
            const emailUser = await this.userModel.findByEmail(email)

            if (!user && !emailUser) {
                return res.status(401).render('auth/login', {
                    errors: ['Invalid username or email.'],
                    form: { username, email }
                })
            }
            const isValidPassword = user ? await bcrypt.compare(password, user.password) : false

            if (!isValidPassword) {
                return res.status(401).render('auth/login', {
                    errors: ['Invalid password.'],
                    form: { username, email }
                })
            }

            req.session.user = {
                id: user.id,
                username: user.username
            }

            res.redirect('/articles')
        } catch (error) {
            this.handleError(res, error, 'Failed to login', 500)
        }
    }

    logout(req, res) {
        if (!req.session) {
            return res.redirect('/login')
        }

        req.session.destroy(() => {
            res.redirect('/login')
            return res.status(200).json(
                { message: 'Logged out successfully' })
        })
    }
}

module.exports = UserController
