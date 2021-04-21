const Episode = require('../models/Episode')

module.exports = async function (req, res, next) {
  const { uid } = req.params
  const { userUid } = res.locals

  if (uid.length !== 20) {
    return res.status(400).json('Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?')
  }

  try {
    const episode = await Episode.findByPk(uid, {
      include: { association: 'show', include: { association: 'user' } }
    })

    if (episode === undefined || episode === null) {
      return res.status(404).json('Episódio não encontrado')
    } else if (episode.show.user.uid !== userUid) {
      return res.status(403).json('Você não possui permissão de alterar este episódio.')
    } else {
      next()
    }
  } catch {
    return res.status(500).json('Ocorreu um erro na verificação de autor. Tente novamente mais tarde.')
  }
}
