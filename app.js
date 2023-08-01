const Koa = require('koa');
const Router = require('@koa/router');
const trace = require('./middleware/trace');

const app = new Koa();
const router = new Router();
app.use(trace());
router.get('/', (ctx, next) => {
  ctx.body = {
    msg: 'foo bar'
  };
});

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
