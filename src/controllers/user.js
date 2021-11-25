const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { hashPassword } = require('../helpers/auth')
const User = require('../models/User')

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
        })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(422).send({ message: "Email não encontrado." })
        }
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(422).send({ message: "Senha incorreta." })
        }

        const SECRET = process.env.SECRET
        const token = jwt.sign({ id: user._id }, SECRET)

        res.status(200).json({
            message: "Token deu bom.",
            token
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: e.message
        })
    }
}


module.exports = {
    getUsers,
    register,
    login
}