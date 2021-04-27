'use strict'

const dir = '/images/categories/'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('category', [
      {
        name: 'Bate-papo e entrevista',
        slug: 'bate-papo-e-entrevista',
        icon: `${dir}chat.svg`
      },
      {
        name: 'Conteúdo adulto',
        slug: 'conteudo-adulto',
        icon: `${dir}adult.svg`
      },
      {
        name: 'Convívio e espiritualidade',
        slug: 'convivio-e-espiritualidade',
        icon: `${dir}living.svg`
      },
      {
        name: 'Educação e formação',
        slug: 'educacao-e-formacao',
        icon: `${dir}education.svg`
      },
      {
        name: 'Geral',
        slug: 'geral',
        icon: `${dir}general.svg`
      },
      {
        name: 'Infantil',
        slug: 'infantil',
        icon: `${dir}kid.svg`
      },
      {
        name: 'Notícia e informação',
        slug: 'noticia-e-informacao',
        icon: `${dir}news.svg`
      },
      {
        name: 'Saúde e bem-estar',
        slug: 'saude-e-bem-estar',
        icon: `${dir}health.svg`
      }
    ], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('category', null, {})
  }
}
