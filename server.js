const Koa = require('koa');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const logger = require('koa-logger');
const Router = require('koa-router');
const fs = require('fs');
const koaWebpack = require('koa-webpack');
const cors = require('kcors')();
const jsonp = require('koa-jsonp');
const bodyParser = require('koa-body')();

// Initialize application
const app = module.exports = new Koa();
const compiler = webpack(config);

// Handle Error 404 and 500
app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    ctx.status = 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.use(logger());

// webpack dev and hot middleware
const middleware = koaWebpack({
  compiler: compiler,
  dev: {
    noInfo: true,
    publicPath: config.output.publicPath
  }
});

app.use(middleware);

function getThings(ctx) {
  ctx.body = {
    id: ctx.params.id,
    content: 'ABCD',
    title: 'EFGH'
  };
}

function postThings(ctx) {
  ctx.body = {
    content: ctx.request.body,
    success: true
  };
}

async function isJSON(ctx, next) {
  ctx.type = 'json';
  await next();
}

const apiRouter = new Router({
  prefix: '/api'
});

const router = new Router();

apiRouter.get('/jsonp/:id',jsonp({callbackName:'_cb'}),  getThings);

apiRouter.options('/cors',cors);
apiRouter.get('/cors/:id',cors,isJSON,getThings);
apiRouter.post('/cors',cors,bodyParser, isJSON, postThings);

// domain and postMessage
apiRouter.get('/normal/:id', isJSON, getThings);
apiRouter.post('/normal', bodyParser, isJSON, postThings);

router.get('/', async ctx => {
  ctx.type = 'html';
  ctx.body = fs.readFileSync('./app/dist/views/index.html');
});

router.get('/demo/:name', async ctx => {
  ctx.type = 'html';
  ctx.body = fs.readFileSync(`./app/dist/views/demo/${ctx.params.name}.html`);
});

app.use(apiRouter.routes());
app.use(router.routes());


// Start server
const port = 80;
app.listen(port);
console.log('Running server at http://localhost:%d', port);

