const path = require('path');
const less = require('less');
const readFile = require('../../util/file').read;
const logger = require('tracer').colorConsole({
    level: 'log'
});

module.exports = (params) => {
    var variables = params.variables;
    return readFile(path.resolve(__dirname, '../../source/' + params.name + '.less'))
        .then(() => {
            logger.log('load %s with %j', params.name, variables);
            var content = '';
            Object.keys(variables).forEach((key) => {
                content += [key, variables[key]].join(': ') + '\n';
            });
            return content;
        });
};