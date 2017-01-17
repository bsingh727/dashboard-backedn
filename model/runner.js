var newman = require('newman'); // require newman in your project
var path = require('fs');
var output_filename;
var abc;
module.exports = {
  executenewman: function (collectionJson,filename) {
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

  },
  checkfileExists: function(filename){
     var status;
     path.readFile(filename, 'utf8',function (exists,data) {
                if (!exists) {
                   status='success';
                 }else{
                  status= "failure";
                }
     });
     return status;
   },
   readAllFile:function(){
                const folder = './collection/';
                const fs = require('fs');
                var status;
                var count=0;
                var output_filename;
                fs.readdir(folder, (err, subfolder) => {
                  subfolder.forEach(subfolder_name => {
                    var dir='./collection/'+subfolder_name+'/';
                    var dir_output = './collection_output/'+subfolder_name+'_json_output';
                    var dir_output_complete='./collection_complete/'+subfolder_name+'_json_output';
                      if (!fs.existsSync(dir_output)){
                      fs.mkdirSync(dir_output);
                      }
                    count++;
                    fs.readdir(dir, (err, json_file) => {
                     json_file.forEach(json_file_name => {
                                        var collectionjson='.'+dir+json_file_name;
                                        var collectionjson_path=dir+json_file_name;
                                        output_filename=dir_output+'/output_'+json_file_name;
                                        var filepath2=dir_output_complete+'/complete'+json_file_name;
                                        status=this.executenewman(collectionjson,output_filename);
                                        console.log("Nemman runner Status-->"+status);
                                        console.log("input json path-->"+collectionjson);
                                        console.log("ouput json path-->"+output_filename);
                                        })
                     });
                  });
                })

    },
    getFileName:function(){
    return filename;}
};
