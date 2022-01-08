process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Generating words from numbers', () => {
  describe('/POST parseNumbers', () => {
      it('empty words using dict', (done) => {
        let req = {
            "numbers": "",
            "useDict": true
        }
        chai.request(server)
            .post('/parseNumbers')
            .send(req)
            .end((err, res) => {
              res.should.have.status(200);
              const data = res.body;              
              data.should.be.a('object');
              data.should.have.property("words");
              data.words.should.be.a('array');
              data.words.should.have.lengthOf(0);
              done();
            });
      });

      it('empty words not using dict', (done) => {
        let req = {
            "numbers": "",
            "useDict": false
        }
        chai.request(server)
            .post('/parseNumbers')
            .send(req)
            .end((err, res) => {
              res.should.have.status(200);
              const data = res.body;              
              data.should.be.a('object');
              data.should.have.property("words");
              data.words.should.be.a('array');
              data.words.should.have.lengthOf(0);
              done();
            });
      });

      it('one letter words using dict', (done) => {
        let req = {
            "numbers": "2",
            "useDict": true
        }
        chai.request(server)
            .post('/parseNumbers')
            .send(req)
            .end((err, res) => {
              res.should.have.status(200);
              const data = res.body;              
              data.should.be.a('object');
              data.should.have.property("words");
              data.words.should.be.a('array');
              data.words.should.have.lengthOf(3);
              data.words.should.include.members(['a', 'b', 'c'])
              done();
            });
      });

      it('one letter words not using dict', (done) => {
        let req = {
            "numbers": "2",
            "useDict": true
        }
        chai.request(server)
            .post('/parseNumbers')
            .send(req)
            .end((err, res) => {
              res.should.have.status(200);
              const data = res.body;              
              data.should.be.a('object');
              data.should.have.property("words");
              data.words.should.be.a('array');
              data.words.should.have.lengthOf(3);
              data.words.should.include.members(['a', 'b', 'c'])
              done();
            });
      });

      it('two letter words not using dict', (done) => {
        let req = {
            "numbers": "23",
            "useDict": false
        }
        chai.request(server)
            .post('/parseNumbers')
            .send(req)
            .end((err, res) => {
              res.should.have.status(200);
              const data = res.body;              
              data.should.be.a('object');
              data.should.have.property("words");
              data.words.should.be.a('array');
              data.words.should.have.lengthOf(9);
              data.words.should.include.members(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']);
              done();
            });
      });

      it('longer words using dict - word "the/tie"', (done) => {
        let req = {
            "numbers": "843",
            "useDict": true
        }
        chai.request(server)
            .post('/parseNumbers')
            .send(req)
            .end((err, res) => {
              res.should.have.status(200);
              const data = res.body;              
              data.should.be.a('object');
              data.should.have.property("words");
              data.words.should.be.a('array');
              data.words.should.include("the");
              data.words.should.include("tie");
              done();
            });
      });

      it('longer words using dict - word "home"', (done) => {
        let req = {
            "numbers": "4663",
            "useDict": true
        }
        chai.request(server)
            .post('/parseNumbers')
            .send(req)
            .end((err, res) => {
              res.should.have.status(200);
              const data = res.body;              
              data.should.be.a('object');
              data.should.have.property("words");
              data.words.should.be.a('array');
              data.words.should.include("home");
              done();
            });
      });

      it('max length of 100', (done) => {
        let req = {
            "numbers": "2345678",
            "useDict": false
        }
        chai.request(server)
            .post('/parseNumbers')
            .send(req)
            .end((err, res) => {
              res.should.have.status(200);
              const data = res.body;              
              data.should.be.a('object');
              data.should.have.property("words");
              data.words.should.be.a('array');
              data.words.should.have.lengthOf(100);
              done();
            });
      });
  });

});