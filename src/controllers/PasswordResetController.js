require('dotenv').config()

const nodemailer = require('nodemailer')
const nanoid = NanoIDLength => require('../config/configNanoid')(NanoIDLength)
const transporterConfig = require('../config/transporterConfig')

const User = require('../models/User')
const PasswordReset = require('../models/PasswordReset')

class PasswordResetController {
  async create (req, res) {
    const { email } = req.body
    const uid = await nanoid(50)()

    try {
      const userFound = await User.findOne({ attributes: ['uid', 'email', 'username'], where: { email } })

      if (userFound === undefined || userFound === null) {
        return res.status(403).json('O e-mail informado não pertence a uma conta.')
      }

      const date = new Date()
      const year = date.getFullYear()
      const URL = process.env.HOST_FRONTEND + uid

      const emailContent = {
        from: `Upcast <${process.env.MAIL_FROM_ADDRESS}>`,
        to: email,
        subject: 'Redefinição de senha',
        html: `<h1>Olá.</h1>
        <br>
        <br>
        <h3>Para redifinir sua senha, basta acessar o endereço abaixo:</h3>
        <a href='${URL}' target='_blank'>Recuperar senha</a>
        <br>
        <br>
        <p>O pedido de redefinição expira em 12 horas e só poderá ser usado uma única vez!</p>
        <p>Caso não tenha solicitado a recuperação de senha, ignore este email.</p>
        <br>
        <br>
        <hr>
        <br>
        <small>©${year} Upcast Inc.</small>`
      }

      const transporter = nodemailer.createTransport(transporterConfig)
      await transporter.sendMail(emailContent)

      await PasswordReset.create({ uid, user_uid: userFound.uid })

      return res.status(201).json('Pedido de recuperação criado com sucesso, verifique seu e-mail.')
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }
}

module.exports = new PasswordResetController()
