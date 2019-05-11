const path = require('path');
const fs = require('fs');
const cwd = process.cwd();
const bishengConfig = require(`${cwd}/bisheng.config.js`);

function getSingleRouterConfig(template, _root) {
  let routeConfig = {};
  function getDir(root = _root, tem = template) {
    let f = fs.readdirSync(root);
    f.forEach(item => {
      let itemPath = path.join(root, item);
      let state = fs.statSync(itemPath);
      if (state.isDirectory()) {
        getDir(itemPath, tem + `/${item}`);
      } else {
        let route = tem + "/:childe";
        routeConfig[route] = route;
      }
    });
  }
  getDir();

  return Object.keys(routeConfig).map(item => {
    return {
      path: item,
      component: "./template/Article"
    };
  });
}

function getRouterConfig() {
  let routeConfig = [];
  Object
    .keys(bishengConfig.source)
    .forEach(key => {
      let root = path.resolve(cwd, bishengConfig.source[key]);
      routeConfig = routeConfig.concat(getSingleRouterConfig(key, root));
    });

  return routeConfig;
}

function getPick() {
  let pick = {};
  Object.keys(bishengConfig.source)
    .forEach(key => {
      pick[key] = (markdownData) => {
        return {
          meta: markdownData.meta,
          description: markdownData.description,
        };
      };
    });
  return pick;
}


module.exports = {
  lazyLoad: true,
  pick: getPick(),
  plugins: [path.join(__dirname, '..', 'node_modules', 'bisheng-plugin-description')],
  routes: {
    path: "/",
    component: './template/Layout/index',
    indexRoute: { component: './template/BlogLog/index' },
    childRoutes: getRouterConfig()
  }
};
