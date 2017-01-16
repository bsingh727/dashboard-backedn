var newman = require('newman'); // require newman in your project
var cron = require('node-cron');
var fs = require('fs');

// call newman.run to pass `options` object and wait for callback
var collectiondetails="./collection/userpostcollection.json";
var exports = module.exports = {};
exports.runnewman=function(){
newman.run({
    collection: require(collectiondetails),
    reporters: 'json'
}).on('start', function (err, args) { // on start of run, log to console
     console.log('running a collection...');
 }).on('done', function (err, summary) {
     if (err || summary.error) {
         console.error('collection run encountered an error.');
         //return summary.error;
     }
     else {
         console.log('collection run completed.');
        // console.log(summary);
        //return "success";
     }
 });
 return "success";

 }
exports.runNewmanCron=function(){
cron.schedule('* * * * * *', function(){
  exports.runnewman();
  console.log('running a task every minute');
});
}
exports.checkFile=function(filename){
fs.exists(filename, function(exists) {
  if (exists) {
  console.log("file exits"+exists);
    return exists;
  }
});
}