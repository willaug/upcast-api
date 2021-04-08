const slugify = require('slugify')
const slugConfig = { lower: true, strict: true }

const categories = [
  {
    name: 'Bate-papo e entrevista'
  },
  {
    name: 'Conteúdo adulto'
  },
  {
    name: 'Convívio e espiritualidade'
  },
  {
    name: 'Educação e formação'
  },
  {
    name: 'Geral'
  },
  {
    name: 'Infantil'
  },
  {
    name: 'Notícia e informação'
  },
  {
    name: 'Saúde e bem-estar'
  },
  {
    name: 'Storytelling'
  }
]

const addSlug = async () => {
  for (let i = 0; i < categories.length; i++) {
    const name = categories[i].name
    const slug = await slugify(name, slugConfig)
    categories[i].slug = slug
  }
  module.exports = categories
}

addSlug()
