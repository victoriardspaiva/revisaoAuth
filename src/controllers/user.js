const User = require('../models/User')
const { hashPassword } = require('../helpers/auth')

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const newUser = new User({
            name,
            email,
            password
        })

        const passwordHashed = await hashPassword(newUser.password, res)

        newUser.password = passwordHashed

        const saveUser = await newUser.save()
        res.status(201).json({
            message: "Pessoa cadastrada com sucesso",
            saveUser
        })

    } catch (e) {
        res.status(500, {
            message: e.message
        })    }

}
module.exports = {
    getUsers,
    register
}