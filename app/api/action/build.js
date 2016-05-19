const path = require('path');
const less = require('less');
const md5 = require('md5');
const readFile = require('../../util/file').read;
const writeFile = require('../../util/file').write;
const getFileStats = require('../../util/file').stat;
const jsonUtil = require('../../util/json');
const logger = require('tracer').colorConsole({
    level: 'log'
});

module.exports = (params) => {
    var variables = params.variables;
    // try {
    //     variables = JSON.parse(params.variables);
    // } catch(e) {
    //     logger.warn('%s compile error with %s', params.name, params.variables);
    //     variables = {};
    // }
    return readFile(path.resolve(__dirname, '../../source/' + params.name + '.less'))
        .then((data) => {
            logger.log('render %s with %j', params.name, variables);
            return less.render(data, {
                modifyVars: variables
            })
                .then((output) => {
                    var id = md5(output.css);
                    var cssFileName = [params.name, id, 'css'].join('.');
                    var cssFilePath = path.resolve('./src/css', cssFileName); 
                    getFileStats(cssFilePath)
                        .catch((err) => {
                            writeFile(cssFilePath, output.css)
                                .then(() => {
                                    logger.info('write css file: %s success!', cssFileName);
                                })
                                .catch(() => {
                                    logger.warn('write css file: %s failed!', cssFileName);
                                });
                        });
                    return jsonUtil.success({
                        css: ['', 'assets', 'css', cssFileName].join('/')
                    });
                })
                .catch((err) => {
                    return jsonUtil.error(err);
                });
        })
        .catch((err) => {
            return jsonUtil.error(err);
        });
};