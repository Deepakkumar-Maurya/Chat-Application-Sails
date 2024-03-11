const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

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
    const username = 'TestUser';

    await chai
      .request(sails.hooks.http.app)
      .get(`/chats?username=${username}`)
      .set('bypass-policies-for-testing', 'true')
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
    const user = 'TestFriend';
    const username = 'TestUser';

    chai
    .request(sails.hooks.http.app)
    .get(`/oneChat?user=${encodeURIComponent(user)}&username=${encodeURIComponent(username)}`)
    .set('bypass-policies-for-testing', 'true')
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
