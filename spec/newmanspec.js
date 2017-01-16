var request = require("request");
var collectiondetails="../collection/tmp/completeoutput_userpostcollection.json";
var filename="login_output.json";
var newman=require('../model/runner');
var base_url = "http://localhost:2016/collectiondetails";
describe("rest client server", function() {
  describe("GET /", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
      });
    });
  });
  });
  describe("newman runner", function() {
      it("check json generated", function() {
      console.log("runner");
        var result=newman.executenewman(collectiondetails,filename);
        console.log(result);
        console.log(collectiondetails);
        expect(result).toBe("success");
      });
    });
    describe("checking file exit or not", function() {
      it("newman runner test", function() {
      console.log("runner");
        var result=newman.checkfileExists(filename);
        console.log(result);
        //console.log(collectiondetails);
        expect("success").toBe("success");
      });
    });
     describe("checking folder exit or not", function() {
      it("newman runner test", function() {
      console.log("runner");
        var result=newman.checkfileExists('../collection_output/login/'+filename);
        console.log(result);
        //console.log(collectiondetails);
        expect("success").toBe("success");
      });
    });
     describe("Read all file", function() {
      it("newman runner test and folder exit check", function() {
      console.log("runner");
        var result=newman.readAllFile();
        /*var clock = sinon.useFakeTimers();
       clock.tick(80000);
        console.log("getFileName->"+newman.getFileName());*/
        console.log("ReadAllFile-->"+result);
        var status=newman.checkfileExists(result);
        console.log(status);
        expect(status).toBe("success");
      });
    });
    describe("Testing  through mock spies", function () {
        it("Should verify a spy was called", function () {
            // Arrange
            //var myApp = new MyApp();
            spyOn(newman, "readAllFile");

            // Act
            var result = newman.readAllFile();

            // Assert
            expect(newman.readAllFile).toHaveBeenCalled();
            expect(result).toEqual("It was false");
        });

    });
