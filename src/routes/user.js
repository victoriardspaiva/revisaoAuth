const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

//@route GET /api/users/
//@desc Listar todos os usuários
//@acess Public
router.get('/', userController.getUsers)

//@route POST /api/users/register 
//@desc Criar conta
//@acess Public
router.post('/register', userController.register)

module.exports = router