const fs = require('fs');

exports.read = function(file){
    return new Promise((resolve, reject) => {
        fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
            if (err) reject(err);
            resolve(data);   
        });
    });
};

exports.write = function(file, data){
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject(err);
            resolve();    
        });
    });    
};

exports.stat = function(path){
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) reject(err);
            resolve(stats);
        });
    });  
};