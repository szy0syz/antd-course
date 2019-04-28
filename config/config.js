export default {
  singular: true,
  routes: [
    {
      path: '/',
      component: '../layout',
      routes: [
        {
          path: 'helloworld',
          component: './HelloWorld'
        },
        { path: 'puzzlecards', component: './puzzlecards' },
        { path: 'list', component: './list' }
      ]
    }
  ],
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true
      }
    ]
  ],
  proxy: {
    '/dev': {
      target: 'https://official-joke-api.appspot.com',
      changeOrigin: true,
      pathRewrite: { "^/dev": "" }
    },
  },
}
