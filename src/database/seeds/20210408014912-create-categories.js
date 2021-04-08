'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('category', [
      {
        name: 'Bate-papo e entrevista',
        slug: 'bate-papo-e-entrevista'
      },
      {
        name: 'Conteúdo adulto',
        slug: 'conteudo-adulto'
      },
      {
        name: 'Convívio e espiritualidade',
        slug: 'convivio-e-espiritualidade'
      },
      {
        name: 'Educação e formação',
        slug: 'educacao-e-formacao'
      },
      {
        name: 'Geral',
        slug: 'geral'
      },
      {
        name: 'Infantil',
        slug: 'infantil'
      },
      {
        name: 'Notícia e informação',
        slug: 'noticia-e-informacao'
      },
      {
        name: 'Saúde e bem-estar',
        slug: 'saude-e-bem-estar'
      },
      {
        name: 'Storytelling',
        slug: 'storytelling'
      }
    ], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('category', null, {})
  }
}
