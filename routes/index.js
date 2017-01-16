var express=require('express');
var router=express.Router();
var fs = require('fs');
var cron = require('node-cron');
var runner=require('../model/runner');
    router.get('/', function(req, res, next){
        res.render('index.html');
    });
    router.get('/getuserdetails', function(req, res, next){
        res.render('index.html');
    });
    router.post('/devdashboard', function(req,res,next){
        var projectid=req.body.projectid;
        newmanrunner.checkFile('../model/newman_runner.js');
        fs.readFile( __dirname + "/" + "userpostcollection.json", 'utf8', function (err, data) {
               //console.log( data );
               res.send( data );
         });
    });
    router.get('/run-scheduler', function(req,res,next){
        runner.readAllFile();
        cron.schedule('* * * * *', function(){
                runner.readAllFile();
                console.log("Cron Trigger");
        })
        res.send( "Scheduler is runninr..." );
    });
    router.post('/getprojectdetails', function(req, res){

        console.log(req.body);
        var project_name = req.body.project_name;

        fs.readFile('src/newmanresults/PRJ1/1.JSON', 'utf-8', function(err, content) {
            if (err) {
             // onError(err);
              return err;
            }
            res.send(content);
        });
    });
module.exports=router;
