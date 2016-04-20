const buildAction = require('./action/build');

module.exports = function *(next){
    var action = this.params.action;
    var params = this.request.body;
    switch (action) {
        case 'build':
            this.body = yield buildAction(params);
            break;
        default:
            break;
    }
};