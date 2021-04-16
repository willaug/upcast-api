class AccountController {
  async index (req, res) {
    res.send('Olá, você está logado!')
  }
}

module.exports = new AccountController()
