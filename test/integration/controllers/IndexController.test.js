const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

// -----------------------------------------------------
// -------------------------------------------------------

// const server = 'http://localhost:1337';
// const session = require('supertest-session');
// const app = require('../../../app');
// const testSession = session(app);

chai.use(chaiHttp);


describe('GET Pages', () => {
  it('should return home page', async () => {
    chai
    .request(sails.hooks.http.app)
    .get('/')
    .end((err, res) => {
      if (err) {
        throw err;
      }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      // console.log(res.text);
    });
  });

  it('should return signup page', async () => {
    chai
    .request(sails.hooks.http.app)
    .get('/signup')
    .end((err, res) => {
      if (err) {
        throw err;
      }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      // console.log(res.text);
    });
  });

  it('should return login page', async () => {
    chai
    .request(sails.hooks.http.app)
    .get('/login')
    .end((err, res) => {
      if (err) {
        throw err;
      }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      // console.log(res.text);
    });
  });

  it('should return chats page', async () => {
    chai
    .request(sails.hooks.http.app)
    .get('/chats')
    .end((err, res) => {
      if (err) {
        throw err;
      }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      // console.log(res.text);
    });
  });

  it('should return oneChat page', async () => {
    chai
    .request(sails.hooks.http.app)
    .get('/oneChat')
    .end((err, res) => {
      if (err) {
        throw err;
      }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      // console.log(res.text);
    });
  });
});
