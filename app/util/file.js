const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const logger = require('tracer').colorConsole({
    level: 'log'
});

function stat(filePath){
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) reject(err);
            resolve(stats);
        });
    });  
}

function checkFilePath(filePath){
    return new Promise((resolve, reject) =>{
        stat(filePath)
            .then((stats) => {
                resolve();
            })
            .catch(() => {
                mkdirp(filePath, function(err){
                    if (err) logger.error('make assets dir: %s failed', filePath);
                    resolve();
                });
            });
    });
}

exports.read = function(file){
    return new Promise((resolve, reject) => {
        fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
            if (err) reject(err);
            resolve(data);   
        });
    });
};

exports.write = function(file, data){
    var filePath = path.dirname(file);
    return new Promise((resolve, reject) => {
        checkFilePath(filePath)
            .then(function(){
                fs.writeFile(file, data, (err) => {
                    if (err) reject(err);
                    resolve();    
                });
            });
    });    
};

exports.stat = stat;