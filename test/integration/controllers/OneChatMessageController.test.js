const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

describe('OneChatMessageController', () => {
  it('should send message', async () => {
    const username = 'TestUser';
    const newmsg = 'testMessage';
    const userfriend = 'TestFriend';
    const res = await chai.request(sails.hooks.http.app)
                .post('/oneChatMsgSend')
                .set('bypass-policies-for-testing', 'true')
                .send({ username, newmsg, userfriend });

    expect(res.statusCode).to.equal(200);
  });

  it('should get message', async () => {
    const userscred = {
      sendername : 'TestUser',
      receivername : 'TestFriend',
    };
    const res = await chai.request(sails.hooks.http.app)
               .post('/oneChatPolling')
               .set('bypass-policies-for-testing', 'true')
               .send(userscred);

    expect(res.statusCode).to.equal(200);
  });

  after((done) => {
    Message.destroy({
      sendername: ['TestUser'],
    }).exec(done);
  });

});

