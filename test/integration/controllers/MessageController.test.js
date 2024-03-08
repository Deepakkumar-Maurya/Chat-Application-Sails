const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

describe('Send Message', () => {
  it('should send message', async() => {
    const username = 'TestUser';
    const newmsg = 'testMessage';
    const res = await chai.request(sails.hooks.http.app)
           .post('/msgsend')
           .send({ username, newmsg })
           .set('bypass-policies-for-testing', 'true');

    expect(res.statusCode).to.equal(200);
  });

  it('should get message', async() => {
    const res = await chai.request(sails.hooks.http.app)
           .get('/polling')
           .set('bypass-policies-for-testing', 'true');

    expect(res.statusCode).to.equal(200);
  });

  after((done) => {
    OneChatMessage.destroy({
      name: ['TestUser'],
    }).exec(done);
  });

});
