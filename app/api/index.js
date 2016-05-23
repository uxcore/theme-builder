const compileAction = require('./action/compile');
const downloadAction = require('./action/download');
const getVarsAction = require('./action/getVars');

module.exports = function *(next){
    var action = this.params.action;
    var params = this.request.body;
    switch (action) {
        case 'compile':
            this.body = yield compileAction(params);
            break;
        case 'download':
            this.attachment('uxcore-kuma');
            this.body = yield downloadAction(params);
            break;
        case 'getVars':
            this.attachment('theme.less');
            this.body = yield getVarsAction(params);
            break;
        default:
            break;
    }
};