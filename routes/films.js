//var connection = require('./db');
var mysql = require('mysql');
//mysql
connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123',
    database: 'film'
});

module.exports = function(app){
    app.get('/films', function(req, req){
        connection.query('SELECT * FROM films', function(err, rows){
            res.render('films', {films : rows});
        });
    });
}