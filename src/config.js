require('babel-polyfill')

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Bieblo',
    description: 'Bieblo client',
    head: {
      titleTemplate: 'Bieblo - %s',
      meta: [
        {name: 'description', content: 'Bieblo client.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Bieblo'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'nl_BE'},
        {property: 'og:title', content: 'Bieblo Admin'},
        {property: 'og:description', content: 'Bieblo client.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@jverhaert'},
        {property: 'og:creator', content: '@jverhaert'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'},
      ],
    },
  },

}, environment)
