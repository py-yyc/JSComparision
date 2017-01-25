var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config');
var compression = require('compression');
var express = require('express');
var expressNunjucks = require('express-nunjucks');
var nunjucks = require('nunjucks');
var appConfig = require('./config');

var app = express();
var port = 3030;
var mode = process.env.NODE_ENV || 'development';
var isDev = mode !== 'production';
var hot = isDev;
var compress = !isDev;
var useIndexTemplate = true;

var configForIndexTemplate = {
  apiHost: 'https://api.github.com',  // Your Server: 'http://127.0.0.1:3000'  (Make sure to enable CORS support)
  routerBasePath: '/'
};

var titleForIndexTemplate = "React App";

var indexPath = path.resolve(__dirname, appConfig.outputPath, appConfig.indexFilename);
var indexUrl = path.join(appConfig.publicPath, appConfig.indexFilename);

/*
 * Nunjucks templating is similar to Jinja 2
 */
var nunjucksEnv;
if (useIndexTemplate) {
  nunjucksEnv = new nunjucks.Environment([], { autoescape: false });
  app.set('views', path.dirname(indexPath));
  expressNunjucks(app, {
    watch: isDev,
    noCache: isDev,
    autoescape: false
  });
}

// Use the webpack hot module replacment feature when running in development mode
var compiler, middleware;
if (isDev) {
  compiler = webpack(webpackConfig);
  middleware = webpackDevMiddleware(
    compiler,
    {stats: 'errors-only', noInfo: true, publicPath: webpackConfig.output.publicPath}
  );
  app.use(middleware);
  if (hot) {
    app.use(webpackHotMiddleware(compiler));
  }
}

// Use gzip for faster transfer
if (compress) {
  app.use(compression());
}

// Add static path lookup for vendored resources
var staticMap = {};
if (!isDev) {
  staticMap[appConfig.publicPath] = '/' + appConfig.outputPath;
}

for (var staticPath in staticMap) {
  if( staticMap.hasOwnProperty(staticPath) ) {
    app.use(staticPath, express.static(__dirname + staticMap[staticPath]));

    // Make sure we generate 404 responses for any unfound static assets so we can test error cases
    app.use(staticPath, function(req, res) {
        res.status(404).send('File Not Found');
    });
  }
}

/*
 * Serve the index file, potentially merged with template data
 */
if (useIndexTemplate) {
  // Template variables
  var configContent = {
    config: JSON.stringify(configForIndexTemplate),
    title: titleForIndexTemplate
  };

  if (isDev) {
    app.use(function (req, res, next) {
      middleware.waitUntilValid(function() {
        var memoryFs = compiler.outputFileSystem;
        var indexFile = memoryFs.readFileSync(indexPath, 'utf8');
        res.send(nunjucksEnv.renderString(indexFile, configContent));
      });
    });
  }
  else {
    app.use(function (req, res) {
      res.render('index', configContent);
    });
  }
}
else {
  if (isDev) {
    app.use(function (req, res, next) {
      req.url = indexUrl;
      return middleware(req, res, next);
    });
  }
  else {
    app.use(function (req, res, next) {
      res.sendFile(indexPath);
    });
  }
}

/*
 * Start the web server
 */
app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("===> Listening on port %s in %s mode. Open up http://localhost:%s/ in your browser.", port, mode, port);
    }
});