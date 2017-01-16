var express=require('express');
var path=require('path');
var bodyparser=require('body-parser');
var index=require('./routes/index');
var taskapi=require('./routes/task');
var app=express();
var port=2017;
//set view engine
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//set statisc
app.use(express.static(path.join(__dirname,'client')));
 //body parser
 app.use(bodyparser.json());
 app.use(bodyparser.urlencoded({extended:true}));
 app.use('/', index);
 /*app.use(app.index);
 index.initialize(app);*/
 //app.use('/api',taskapi);
 app.use('/api',taskapi);
 app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
 });
/* app.use(app.taskapi);
 taskapi.initialize(app);*/
 app.listen(port,function(){
 console.log("Server is started - port no: "+port);
 });
 module.exports = app;