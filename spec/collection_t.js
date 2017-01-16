var assert = require('assert');
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var readcollection = require('../routes/serviceclass/readcollection');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);
describe('mocha test pass', function() {
  describe('test is working', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
describe('JsonSummary', function() {
  it('getSubtotal() should return 0 if no items are passed in', function() {
    var readcollection = new readcollection();
    expect(readcollection.findOne("ssd")).to.equal(0);
  });
});
 describe('/post collectiondetails', () => {
      it('it should GET the status 200 (ok)', (done) => {
        chai.request(server)
            .post('/collectiondetails')
            .end((err, res) => {
                res.should.have.status(200);

              done();
            });
      });
  });
   describe('/post collectiondetails', () => {
        it('it should GET the array of json', (done) => {
          chai.request(server)
              .post('/collectiondetails')
              .end((err, res) => {
                  res.body.should.be.a('array');
                done();
              });
        });
    });
     describe('/post collectiondetails', () => {
            it('it should GET the body  of json length > 0', (done) => {
              chai.request(server)
                  .post('/collectiondetails')
                  .end((err, res) => {
                       res.body.should.a.length.eql(0);
                    done();
                  });
            });
        });
         describe('/post collectiondetails', () => {
                    it('it should GET the array of object', (done) => {
                      chai.request(server)
                          .post('/collectiondetails')
                          .end((err, res) => {
                              res.body.should.be.a('array');
                            done();
                          });
                    });
                });