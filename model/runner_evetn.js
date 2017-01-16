// Import events module
var events = require('events');
var newman = require('newman');
// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();
// Create an event handler as follows
var myApp=function(){
}
myApp.runnerNemman=function(collectionJson,filename){
 var runner_status;
    try{
    newman.run({
                collection: require(collectionJson),
                   reporters: 'json',
                   reporter: {
                        json: {
                            export: filename
                        }
                   }
             }).on('start', function (err, args) { // on start of run, log to console
              //console.log('running a collection...');
             }).on('done', function (err, summary) {
                  if (err || summary.error) {
                      console.error('collection run encountered an error.');
                      runner_status = summary.error;
                  }
             });
             return "success";
     }
     catch(e){
             console.log(e);
      }
      return runner_status;
}
myApp.connection=function(callback) {
const folder = './collection/';
                const fs = require('fs');
                var status;
                var filename;
                var count=0;
                fs.readdir(folder, (err, subfolder) => {
                  subfolder.forEach(subfolder_name => {
                    var dir='./collection/'+subfolder_name+'/';
                    var dir_output = './collection_output/'+subfolder_name+'_json_output';
                    var dir_output_complete='./collection_complete/'+subfolder_name+'_json_output';
                      if (!fs.existsSync(dir_output)){
                      fs.mkdirSync(dir_output);
                      }
                    fs.readdir(dir, (err, json_file) => {
                     json_file.forEach(json_file_name => {
                                        var collectionjson='.'+dir+json_file_name;
                                        var collectionjson_path=dir+json_file_name;
                                        filename=dir_output+'/output_'+json_file_name;
                                        var filepath2=dir_output_complete+'/complete'+json_file_name;
                                        status=myApp.runnerNemman(collectionjson,filename);
                                       // var connectHandler=myApp.connection;;
                                        /*eventEmitter.on('connection', status);
                                        // Bind the data_received event with the anonymous function
                                        eventEmitter.on('data_received', function(){
                                           console.log('Json Suucessfully generated.');
                                        });
                                        eventEmitter.emit('connection');*/
                                        console.log("Nemman runner Status-"+status);
                                        console.log("input json-"+collectionjson);
                                        console.log("ouput json-"+filename);
                                        })
                                         count++;
                                         if(subfolder.length==count){
                                         console.log("Program End...!");}
                                         });
                     });
                })
   console.log('connection succesful.');
   eventEmitter.emit('data_received');

   // Fire the data_received event
// Bind the connection event with the handler
}
myApp.eventStart=function(){
// Fire the connection event
var connectHandler=myApp.connection;;
eventEmitter.on('connection', connectHandler);
// Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function(){
   console.log('Json Suucessfully generated.');
});
eventEmitter.emit('connection');
console.log("Program Ended.");
}
myApp.callback=function(msg){
console.log(msg+"call back");
}
module.exports = myApp;