const fs = require('fs');
const koa = require('koa');
const morgan = require('koa-morgan');
const views = require('koa-views');
const serve = require('koa-static');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const cors = require('kcors');
const app = koa();

const router = require('./app/router');
const appRouter = router.appRouter;
const apiRouter = router.apiRouter; 

app.use(cors({
    origin: app.env === 'production' ? 'http://uxco.re': '*',
    allowMethods: 'POST'
}));
app.use(morgan.middleware('combined'));

app.use(bodyParser());
app.use(json({
    pretty: app.env !== 'production',
    param: 'pretty'
}));

app.use(views(__dirname + '/app/views', {
    map: {
        htm: 'htmling'
    },
    extension: 'htm'
}));

app.use(mount('/assets', serve(__dirname + '/src')));
app.use(mount('/api', apiRouter.routes()));
app.use(mount(appRouter.routes()));

app.listen(8082);