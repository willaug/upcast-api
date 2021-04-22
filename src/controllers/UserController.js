const nanoid = NanoIDLength => require('../config/nanoidConfig')(NanoIDLength)
const bcrypt = require('bcrypt')

const User = require('../models/User')

class UserController {
  async index (req, res) {
    try {
      const users = await User.findAll({
        attributes: ['uid', 'username', 'url_photo']
      })

      const host = process.env.HOST
      const _links = [
        {
          href: `${host}/users`,
          rel: 'post_create_user',
          method: 'POST'
        }
      ]

      return res.status(200).json({ response: users, _links })
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async create (req, res) {
    const { password, email } = req.body
    let { username } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const uid = await nanoid(20)()

    username = username.replace(/  +/g, ' ')

    try {
      const [newUser, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          uid,
          username,
          email,
          password: hashedPassword
        }
      })

      const emailExists = !created

      if (emailExists) {
        return res.status(400).json('E-mail já existente!')
      } else {
        const host = process.env.HOST
        const _links = [
          {
            href: `${host}/users/${uid}`,
            rel: 'get_user',
            method: 'GET'
          },
          {
            href: `${host}/users/${uid}/playlists`,
            rel: 'get_user_playlists',
            method: 'GET'
          },
          {
            href: `${host}/users/${uid}/shows`,
            rel: 'get_user_shows',
            method: 'GET'
          }
        ]

        return res.status(201).json({ response: `Seja bem-vindo(a) ${newUser.username}`, _links })
      }
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async findByUid (req, res) {
    const { uid } = req.params

    if (uid.length !== 20) {
      return res.status(400).json('Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?')
    } else {
      try {
        const user = await User.findByPk(uid, { attributes: ['uid', 'username', 'url_photo', 'createdAt'] })

        if (user === undefined || user === null) {
          return res.status(404).json('Usuário não encontrado.')
        } else {
          const host = process.env.HOST
          const _links = [
            {
              href: `${host}/users`,
              rel: 'get_all_users',
              method: 'GET'
            },
            {
              href: `${host}/users/${uid}/playlists`,
              rel: 'get_user_playlists',
              method: 'GET'
            },
            {
              href: `${host}/users/${uid}/shows`,
              rel: 'get_user_shows',
              method: 'GET'
            }
          ]

          return res.status(200).json({ response: user, _links })
        }
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    }
  }

  async findShows (req, res) {
    const { uid } = req.params

    if (uid.length !== 20) {
      return res.status(400).json('Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?')
    } else {
      try {
        const user = await User.findByPk(uid, {
          attributes: [],
          include: { association: 'userShow', attributes: ['uid', 'title', 'description', 'url_photo'] }
        })

        if (user === undefined || user === null) {
          return res.status(404).json('Usuário não encontrado.')
        } else {
          const host = process.env.HOST
          const _links = [
            {
              href: `${host}/users`,
              rel: 'get_all_users',
              method: 'GET'
            },
            {
              href: `${host}/users/${uid}`,
              rel: 'get_user',
              method: 'GET'
            },
            {
              href: `${host}/users/${uid}/playlists`,
              rel: 'get_user_playlists',
              method: 'GET'
            }
          ]

          return res.status(200).json({ response: user.userShow, _links })
        }
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    }
  }

  async findPlaylists (req, res) {
    const { uid } = req.params

    if (uid.length !== 20) {
      return res.status(400).json('Desculpe, mas a sintaxe está incorreta. Que tal tentar novamente?')
    } else {
      try {
        const user = await User.findByPk(uid, {
          attributes: [],
          include: { association: 'userPlaylist', attributes: ['uid', 'title'] }
        })

        if (user === undefined || user === null) {
          return res.status(404).json('Usuário não encontrado.')
        } else {
          const host = process.env.HOST
          const _links = [
            {
              href: `${host}/users`,
              rel: 'get_all_users',
              method: 'GET'
            },
            {
              href: `${host}/users/${uid}`,
              rel: 'get_user',
              method: 'GET'
            },
            {
              href: `${host}/users/${uid}/shows`,
              rel: 'get_user_shows',
              method: 'GET'
            }
          ]

          return res.status(200).json({ response: user.userPlaylist, _links })
        }
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    }
  }
}

module.exports = new UserController()
