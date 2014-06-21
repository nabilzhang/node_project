var express = require('express'),
    path = require('path'),
    film = require("./routes/films"),
    http = require('http'),
    mysql = require('mysql');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 8700);
//static resource
app.use('/static', express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));


var ROOT_PATH = "/home/work/rd-wangpeibin/workspace/hackton/";

function fmtSecondToGMT(sec) {
    hour = Math.floor(sec / 3600);
    sec = sec % 3600;
    minute = Math.floor(sec / 60);
    sec = sec % 60;
    return (hour < 10 ? "0" : "") + hour + (minute < 10 ? ":0" : ":") + minute + (sec < 10 ? ":0" : ":") + sec;
}
app.get('/films/:id/jpg/:time', function (req, res) {
    var id = req.param('id');
    var time = req.param('time')
    var exec = require('child_process').exec;
    relativ_filepath = 'data/' + id + '/' + time + '.jpg';
    var cmd = 'cd ' + ROOT_PATH + '&&java -jar javaffmpeg.jar Functions cutScreen data/' + id + '.mp4 ' + relativ_filepath + ' ' + fmtSecondToGMT(time);
    console.log(cmd);
    java = exec(cmd);
    java.stdout.on('end', function (data) {
        res.sendfile(path.join(__dirname, '../data/' + id + '/' + time + '.jpg'));
    })
});

//启动Server
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
