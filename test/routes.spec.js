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

describe('API Routes', function() {
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
        response.body.length.should.equal(3);
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
        response.body.length.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0]['foods'].length.should.equal(2);
      });
    });
  });

  describe('GET /api/v1/foods/:id', () => {
    it('should return one food item', () => {
      return chai.request(server)
      .get('/api/v1/foods/1')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.should.have.property('calories');
      });
    });

    it('should return 404 if food not found', () => {
      return chai.request(server)
      .get('/api/v1/foods/13')
      .then((response) => {
        response.should.have.status(404);
      });
    });
  });

  describe('GET /api/v1/meals/:id/foods', () => {
    it('should return a single meal', () => {
      return chai.request(server)
      .get('/api/v1/meals/1/foods')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body['foods'].length.should.equal(2);
      });
    });
  });

  describe('POST /api/v1/foods', () => {
    it('should create a new food item', () => {
      chai.request(server)
      .post('/api/v1/foods')
      .send({'food': { 'name': 'Biscuits', 'calories': 250 }})
      .then((response) => {
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.should.have.property('calories');
        response.body['name'].should.equal('Biscuits');
        response.body['calories'].should.equal(250);
      });

      return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.body.length.should.equal(4);
      });
    });
  });

  describe('PATCH /api/v1/foods/:id', () => {
    it('should update that food item', () => {
      return chai.request(server)
      .patch('/api/v1/foods/1')
      .send({'food': { 'name': 'Biscuits', 'calories': 250 }})
      .then((response) => {
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.should.have.property('calories');
        response.body['name'].should.equal('Biscuits');
        response.body['calories'].should.equal(250);
      });

      return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.body.length.should.equal(2);
      });
    });
  });

  describe('DELETE /api/v1/foods/:id', () => {
    it('should delete that food item', () => {
      chai.request(server)
      .delete('/api/v1/foods/3')
      .then((response) => {
        response.should.have.status(204)
      });

      return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.body.length.should.equal(3);
      });
    });
  });

  describe('POST /api/v1/meals/:id/foods/:id', () => {
    it('should add a mealfood item', () => {
      return chai.request(server)
      .post('/api/v1/meals/1/foods/3')
      .then((response) => {
        console.log(response.body);
        response.should.have.status(201);
        response.body.should.have.property('message');
        response.body['message'].should.include('Successfully added Berries')
      })
    })
  })
});
