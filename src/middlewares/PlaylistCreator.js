const Playlist = require('../models/Playlist')

module.exports = function (req, res, next) {
  const { uid } = req.params
  const { userUid } = res.locals

  if (uid.length !== 20) {
    return res.status(400).json('Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?')
  }

  Playlist.findByPk(uid, {
    attributes: [],
    include: { association: 'author', attributes: ['uid'] }
  }).then(data => {
    if (data === undefined || data === null) {
      return res.status(400).json('Playlist não encontrada.')
    } else if (data.author.uid === userUid) {
      next()
    } else {
      return res.status(403).json('Você não tem permissão para alterar esta playlist.')
    }
  }).catch(() => {
    return res.status(500).json('Ocorreu um erro na verificação de autor. Tente novamente mais tarde.')
  })
}
