const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');
const environment = process.env.NODE_ENV || 'test';
const configuration = require ('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the home page', () => {
    return chai.request(server)
    .get('/')
    .then((response) => {
      response.should.have.status(200);
      response.should.be.html;
    });
  });
});

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done();
  });

  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done();
  });

  describe('GET /api/v1/foods', () => {
    it('should return all foods', () => {
      return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('calories');
        response.body[0]['name'].should.equal('Bananas');
        response.body[0]['calories'].should.equal(35);
      });
    });
  });

  describe('GET /api/v1/meals', () => {
    it('should return all meals', () => {
      return chai.request(server)
      .get('/api/v1/meals')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(4);
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('foods');
        response.body[0]['name'].should.equal('Breakfast');
        response.body[0]['foods'].should.deep.equal([]);
      });
    });
  });
});
