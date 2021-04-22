const nanoid = NanoIDLength => require('../config/nanoidConfig')(NanoIDLength)
const fs = require('fs')

const Episode = require('../models/Episode')
const Show = require('../models/Show')

class EpisodeController {
  async index (req, res) {
    try {
      const episodes = await Episode.findAll({
        attributes: ['uid', 'title', 'duration'],
        include: { association: 'show', attributes: ['uid', 'title'] }
      })

      const host = process.env.HOST
      const _links = [
        {
          href: `${host}/episodes`,
          rel: 'post_create_episode',
          method: 'POST'
        }
      ]

      return res.status(200).json({ response: episodes, _links })
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async create (req, res) {
    const { userUid } = res.locals
    const { show, title, description } = req.body

    try {
      const showFound = await Show.findByPk(show)

      if (showFound === undefined || showFound === null) {
        return res.status(400).json('O programa que você adicionou não existe.')
      } else if (showFound.user_uid !== userUid) {
        return res.status(403).json('Você não tem permissão para adicionar um episódio nesse programa.')
      } else {
        const uid = await nanoid(20)()

        await Episode.create({
          uid,
          show_uid: show,
          title,
          description
        })

        const host = process.env.HOST
        const _links = [
          {
            href: `${host}/episodes`,
            rel: 'get_all_episodes',
            method: 'GET'
          },
          {
            href: `${host}/episodes/${uid}`,
            rel: 'get_episode',
            method: 'GET'
          },
          {
            href: `${host}/episodes/${uid}`,
            rel: 'update_episode',
            method: 'PATCH'
          },
          {
            href: `${host}/episodes/${uid}`,
            rel: 'delete_episode',
            method: 'DELETE'
          }
        ]

        return res.status(201).json({ response: 'Episódio criado.', _links })
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
        const episode = await Episode.findByPk(uid, {
          attributes: ['uid', 'title', 'description', 'url_audio', 'duration', 'createdAt'],
          include: { association: 'show', attributes: ['uid', 'title', 'url_photo'] }
        })

        if (episode === undefined || episode === null) {
          return res.status(404).json('Episódio não encontrado.')
        } else {
          const host = process.env.HOST
          const _links = [
            {
              href: `${host}/episodes/${uid}`,
              rel: 'patch_update_episode',
              method: 'PATCH'
            },
            {
              href: `${host}/episodes/${uid}`,
              rel: 'delete_episode',
              method: 'DELETE'
            }
          ]

          return res.status(200).json({ response: episode, _links })
        }
      } catch {
        return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
      }
    }
  }

  async update (req, res) {
    const { uid } = req.params
    const { title, description, show } = req.body
    const { audio, duration, userUid } = res.locals

    const audioURL = '/audios/'

    try {
      const episode = await Episode.findByPk(uid)

      const host = process.env.HOST
      const _links = [
        {
          href: `${host}/episodes/${uid}`,
          rel: 'get_episode',
          method: 'GET'
        },
        {
          href: `${host}/episodes/${uid}`,
          rel: 'delete_episode',
          method: 'DELETE'
        }
      ]

      if (audio) {
        if (episode.url_audio !== null) {
          await fs.unlinkSync(`./public${episode.url_audio}`)
        }

        await Episode.update({ url_audio: audioURL + audio, duration }, { where: { uid } })

        return res.status(200).json({ response: 'Aúdio adicionado com sucesso.', _links })
      } else {
        if (description !== undefined) {
          if (description === '') {
            await Episode.update({ description: null }, { where: { uid } })
          } else {
            await Episode.update({ description }, { where: { uid } })
          }
        }

        if (title !== undefined) {
          await Episode.update({ title }, { where: { uid } })
        }

        if (show !== undefined) {
          const showFound = await Show.findByPk(show)

          if (showFound === undefined || showFound === null) {
            return res.status(400).json('O programa mencionado não existe.')
          } else if (showFound.user_uid !== userUid) {
            return res.status(403).json('Você não tem permissão para alterar o programa.')
          } else {
            await Episode.update({ show_uid: show }, { where: { uid } })
          }
        }

        return res.status(200).json({ response: 'Alterações concluídas.', _links })
      }
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }

  async delete (req, res) {
    const { uid } = req.params

    try {
      const episode = await Episode.findByPk(uid)

      if (episode.url_audio !== null) {
        await fs.unlinkSync(`./public${episode.url_audio}`)
      }

      await Episode.destroy({ where: { uid } })

      const host = process.env.HOST
      const _links = [
        {
          href: `${host}/episodes/${uid}`,
          rel: 'get_episode',
          method: 'GET'
        },
        {
          href: `${host}/episodes/${uid}`,
          rel: 'patch_update_episode',
          method: 'PATCH'
        }
      ]

      return res.status(200).json({ response: 'Episódio removido.', _links })
    } catch {
      return res.status(500).json('Desculpe, mas algum erro ocorreu. Que tal tentar novamente?')
    }
  }
}

module.exports = new EpisodeController()
