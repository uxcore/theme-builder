const path = require('path');
const less = require('less');
const readFile = require('../../util/file').read;
// const writeFile = require('../../util/file').write;
// const getFileStats = require('../../util/file').stat;
const jsonUtil = require('../../util/json');
const logger = require('tracer').colorConsole({
    level: 'log'
});
const LessPluginCleanCSS = require('less-plugin-clean-css');
const cleanCSSPlugin = new LessPluginCleanCSS({
    advanced: true
});

module.exports = (params) => {
    var variables = params.variables;
    return readFile(path.resolve(__dirname, '../../source/' + params.name + '.less'))
        .then((data) => {
            logger.log('render %s with %j', params.name, variables);
            return less.render(data, {
                modifyVars: variables,
                plugins: [cleanCSSPlugin]
            })
                .then((output) => {
                    return jsonUtil.success({
                        css: output.css
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