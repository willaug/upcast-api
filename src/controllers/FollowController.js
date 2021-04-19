const jwt = require('jsonwebtoken')

const User = require('../models/User')

class FollowController {
  async followUser (req, res) {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]
    const decoded = jwt.decode(token)

    const follower = decoded.uid
    const following = req.params.uid

    if (follower === following) {
      return res.status(403).json('Você não pode seguir a si mesmo')
    }

    return res.status(200).json('Você está seguindo o usuário: ' + following)
  }
}

module.exports = new FollowController()
