module.exports = {
  exclude: /should-be-ignore/,
  source: {
    blog: './blog',
  },
  theme: './theme',
  lessConfig: {
    javascriptEnabled: true,
  },
  webpackConfig(config) {
    return config;
  },
  themeConfig: {
    home: '/',
    sitename: 'One',
  },
  root: '/',
  hash: true,
};