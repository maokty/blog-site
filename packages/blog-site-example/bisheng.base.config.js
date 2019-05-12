module.exports = {
  port: 8001,
  exclude: /should-be-ignore/,
  source: {
    blog: './blog',
  },
  theme: 'bisheng-theme-blog-site',
  lessConfig: {
    javascriptEnabled: true,
  },
  webpackConfig(config) {
    return config;
  },
  themeConfig: {
    home: '/blog-site/',
    sitename: 'One',
  },
  root: '/blog-site/',
  hash: true,
};