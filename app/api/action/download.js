const path = require('path');
const less = require('less');
const readFile = require('../../util/file').read;
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
            logger.log('load %s with %j', params.name, variables);
            return less.render(data, {
                modifyVars: variables,
                plugins: [cleanCSSPlugin]
            })
                .then((output) => {
                    return output.css;
                });
        });
};