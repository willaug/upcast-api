const jwt = require('jsonwebtoken')

const User = require('../models/User')

class FollowController {
  async followUser (req, res) {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]
    const decoded = jwt.decode(token)

    const follower = decoded.uid
    const following = req.params.uid

    if (following.length !== 20) {
      return res.status(400).json('Sintaxe de usuário incorreta.')
    }

    if (follower === following) {
      return res.status(403).json('Você não pode seguir a si mesmo.')
    }

    try {
      const searchFollowing = await User.findByPk(following, {
        attributes: ['uid'],
        include: { association: 'FollowingUser', attributes: [['uid', 'followerUid']], through: { attributes: [] } }
      })

      if (searchFollowing === undefined || searchFollowing === null) {
        return res.status(400).json('Não é possível seguir este usuário pois ele não existe.')
      }

      const followingFilter = user => (user.followerUid = follower)
      const userFollows = searchFollowing.FollowingUser.some(followingFilter)

      if (userFollows) {
        return res.status(403).json('Você já segue este usuário.')
      }

      const user = await User.findByPk(follower)
      await user.addFollowerUser(following)

      return res.status(201).json('Você começou a seguir este usuário.')
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async unfollowUser (req, res) {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]
    const decoded = jwt.decode(token)

    const follower = decoded.uid
    const following = req.params.uid

    if (following.length !== 20) {
      return res.status(400).json('Sintaxe de usuário incorreta.')
    }

    if (follower === following) {
      return res.status(403).json('Você não pode deixar de seguir a si mesmo.')
    }

    try {
      const searchFollowing = await User.findByPk(following, {
        attributes: ['uid'],
        include: { association: 'FollowingUser', attributes: [['uid', 'followerUid']], through: { attributes: [] } }
      })

      if (searchFollowing === undefined || searchFollowing === null) {
        return res.status(400).json('O usuário que você quer deixar de seguir não existe.')
      }

      const followingFilter = user => (user.followerUid = follower)
      const userFollows = searchFollowing.FollowingUser.some(followingFilter)

      if (!userFollows) {
        return res.status(403).json('Você não segue este usuário, portanto não poderá deixar de seguir.')
      }

      const user = await User.findByPk(follower)
      await user.removeFollowerUser(following)

      return res.status(200).json('Você deixou de seguir este usuário.')
    } catch (err) {
      return res.status(500).json({ err })
    }
  }
}

module.exports = new FollowController()
