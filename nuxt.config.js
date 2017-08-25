require('dotenv').config()
const categories = process.env.KEYWORD + '/categories/'
const tags = process.env.KEYWORD + '/tags/'
const sentiment = process.env.KEYWORD + '/sentiment/'
const today = process.env.KEYWORD + '/today/'
const popular = process.env.KEYWORD + '/popular/'

module.exports = {
  head: {
    title: 'QProb',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    script: [
      { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' },
      { src: '/js/jquery.min.js' },
      { src: '/js/bootstrap.min.js' },
      { src: '/js/main.js' },
      { src: '/js/vue-social-sharing.min.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/static/css/main.css',
    '@/static/css/bootstrap.min.css',
    '@/static/css/font-awesome.min.css'
  ],
  plugins: [
    '~plugins/filters.js',
    '~plugins/axios.js'
  ],
  modules: [
    ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 * 12 }],
  ],
  env: {
    baseUrl: 'http://localhost:3000/',
    logoAlt: '',
    siteName: 'Trading News',
    imgBaseUrl: 'https://qprob.com/',
    apiUrl: 'https://api.qprob.com/v2.0',
    logo: 'static/images/logo/stock_market.png',
    twHandle: 'QProbcom',
    fbHandle: 'QProb-1328788263849733',
    disqusID: 'QProb',
    adClient: 'ca-pub-2578395398126606',
    adSlot: '2747813439'
  },
  router: {
    extendRoutes (routes, resolve) {
      routes.push(
        { path: '', component: resolve(__dirname, 'pages', 'Posts.vue') },
        { path: '/page/:page/', component: resolve(__dirname, 'pages', 'Posts.vue') },
        { path: '/:postSlug/', component: resolve(__dirname, 'pages', 'Post.vue') },
        { path: '/tag/:tagSlug/', component: resolve(__dirname, 'pages', 'PostsByTag.vue') },
        { path: '/source/:catSlug/', component: resolve(__dirname, 'pages', 'PostsByCat.vue') },
        { path: '/tag/:tagSlug/page/:page/', component: resolve(__dirname, 'pages', 'PostsByTag.vue') },
        { path: '/source/:catSlug/page/:page/', component: resolve(__dirname, 'pages', 'PostsByCat.vue') },
        { path: '/quant_finance/popular/', component: resolve(__dirname, 'pages', 'PopularPosts.vue') },
        { path: popular + 'page/:page/', component: resolve(__dirname, 'pages', 'PopularPosts.vue') },
        { path: categories, component: resolve(__dirname, 'pages', 'Categories.vue') },
        { path: tags, component: resolve(__dirname, 'pages', 'Tags.vue') },
        { path: categories + 'page/:page/', component: resolve(__dirname, 'pages', 'Categories.vue') },
        { path: tags + 'page/:page/', component: resolve(__dirname, 'pages', 'Tags.vue') },
        { path: '/quant_finance/sentiment/', component: resolve(__dirname, 'pages', 'Sentiment.vue') },
        { path: today, component: resolve(__dirname, 'pages', 'Today.vue') },
        { path: today + 'page/:page/', component: resolve(__dirname, 'pages', 'Today.vue') },
        { path: '*', component: resolve(__dirname, 'pages', 'Error404.vue') }
      )
    }
  },
  loading: '~/components/Loading.vue',
  build: {
    analyze: true,
    extractCSS: true,
    vendor: ['axios'],
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
