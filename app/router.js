const Router = require('koa-router');

const apiManager = require('./api/index');

const appRouter = new Router();
const apiRouter = new Router();

appRouter
    .get('/', function *(next){
        yield this.render('index');
    })
    .get('/:page', function *(next) {
        switch (this.params.page) {
            case 'index':
                yield this.render(this.params.page);
                break;
            default:
                this.redirect('/index');
                break;
        }
    });
    
apiRouter
    .post('/css/:action', apiManager);
    
exports.appRouter = appRouter;
exports.apiRouter = apiRouter;