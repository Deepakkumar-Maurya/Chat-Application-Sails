const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const bcrypt = require('bcrypt');

chai.use(chaiHttp);

describe('userController test', () => {
  describe('user signup => POST /auth/signup', () => {
    it('should create a new user and redirect to /login', async () => {
      const newUser = {
        name: 'TestUser',
        email: 'test@example.com',
        password: 'testpassword',
        isActive: false,
      };
      const res = await chai
                .request(sails.hooks.http.app)
                .post('/auth/signup')
                .send(newUser);
      expect(res.statusCode).to.equal(200);
      expect(res).to.be.html;
    });

    it('should return error if user already exists', async () => {
      const newUser = {
        name: 'TestUser',
        email: 'test@example.com',
        password: 'testpassword',
        isActive: false,
      };
      const res = await chai
                  .request(sails.hooks.http.app)
                  .post('/auth/signup')
                  .send(newUser);
      expect(res.statusCode).to.equal(400); // user already exist
    });
  });

  describe('user login => POST /auth/login', () => {
    it('should login user and redirect to /chats', async () => {
      const user = {
        email: 'test@example.com',
        password: 'testpassword',
      };
      const res = await chai
                .request(sails.hooks.http.app)
                .post('/auth/login')
                .send(user);
      expect(res.statusCode).to.equal(200);
      expect(res).to.be.html;
    });

    it('should return error if user does not exist', async () => {
      const user = {
        email: 'deepak@example.com',
        password: await bcrypt.hash('password', 10),
      };
      const res = await chai
                  .request(sails.hooks.http.app)
                  .post('/auth/login')
                  .send(user);
      expect(res.statusCode).to.equal(400);
    });
  });

  // reconsider it
  describe('user logout => POST /auth/logout', () => {
    it('should logout user and redirect to /home', async () => {
      const user = {
        username: 'TestUser',
      };
      const res = await chai
                    .request(sails.hooks.http.app)
                    .post('/auth/logout')
                    .set('bypass-policies-for-testing', 'true')
                    .send(user);
      expect(res.statusCode).to.equal(200);
      expect(res).to.be.html;
    });
  });

  describe('GET /showAllUsers', () => {
    it('should get a list of all users', async () => {
      const res = await chai
                    .request(sails.hooks.http.app)
                    .get('/showAllUsers')
                    .set('bypass-policies-for-testing', 'true');

      expect(res.statusCode).to.equal(200);
    });
  });

  describe('GET /showAllCurrentUsers', () => {
    it('should get a list of all current users', async () => {
      const res = await chai
                    .request(sails.hooks.http.app)
                    .get('/showUsers')
                    .set('bypass-policies-for-testing', 'true');

      expect(res.statusCode).to.equal(200);
    });
  });

  after((done) => {
    User.destroy({
      email: ['test@example.com'],
    }).exec(done);
  });

});

