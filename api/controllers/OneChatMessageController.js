/**
 * OneChatMessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

/**
 * @name oneChatSendMsgMid
 * @file OneChatMessageController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will handle send message to the database.
 * @author Deepak (Zignuts)
 * */

let OneChatMsgHistory = [];
oneChatSendMsgMid = async function (username, userfriend, message) {
  console.log('middleware for sending message');
  console.log('sendMsgMid => ',username, userfriend, message);

  try {
    const response = await axios.post(
        'http://localhost:1337/api/messages/oneChatSendMsg',
        { username, userfriend, message }
    );
    OneChatMsgHistory = response.data;

    return OneChatMsgHistory;
  } catch (error) {
    console.log({ error: error.message });
  }
};

/**
 * @name OneChatPollServer
 * @file OneChatMessageController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will handle poll messages to the database.
 * @author Deepak (Zignuts)
 * */

OneChatPollServer = async (data) => {
  try {
    const response = await axios.post(
        'http://localhost:1337/api/messages/oneChatGetMsg',
        { data }
    );
      // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log({
      message: 'Error fetching messages',
      error: error.message,
    });
  }
};

module.exports = {

  /**
 * @name oneChatGetMsgAPI
 * @file OneChatMessageController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will get all messages from the database.
 * @author Deepak (Zignuts)
 * */

  oneChatGetMsgAPI: async function (req, res) {
    // console.log(req.body);
    let userscred = req.body.data;
    const { sendername, receivername } = userscred;
    console.log(sendername, receivername);
    try {
      OneChatMessage.find({
        or: [
          { sendername: sendername, receivername: sendername },
          { sendername: sendername, receivername: receivername },
          { sendername: receivername, receivername: sendername },
          { sendername: receivername, receivername: receivername }
        ]
      }).exec(
              async (err, result) => {
                if (err) {
                  console.log(`error in fetching messages ${err}`);
                  res.status(500).json({ error: 'Internal Server Error' });
                } else {
                  console.log(result);
                  res.json(result);
                }
              }
      );
    } catch (error) {
      console.log(`error in fetching messages ${error}`);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },

  /**
 * @name oneChatSendMsgAPI
 * @file OneChatMessageController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will send a message to the database.
 * @author Deepak (Zignuts)
 * */

  oneChatSendMsgAPI: async function (req, res) {
    const sendername = req.body.username;
    const receivername = req.body.userfriend;
    const message = req.body.message;

    try {
      OneChatMessage.create({
        sendername: sendername,
        receivername: receivername,
        message: message,
      }).exec(async (err, result) => {
        if (err) {
          console.log(`error in sending message ${err}`);
        } else {
          OneChatMessage.find({ sendername, receivername }).exec(
            async (err, result) => {
              if (err) {
                console.log(`error in fetching messages ${err}`);
              } else {
                return res.json(result);
              }
            }
          );
        }
      });
    } catch (error) {
      console.log(`error in sending messages ${error}`);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },

  /**
 * @name oneChatMsgSendButtonAction
 * @file OneChatMessageController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will handle send message to the database.
 * @author Deepak (Zignuts)
 * */

  oneChatMsgSendButtonAction: async function (req, res) {
    const username = req.body.username;
    const message = req.body.newmsg;
    const userfriend = req.body.userfriend;

    console.log('sending msg');

    try {
      const data = await oneChatSendMsgMid(username, userfriend, message);
      console.log('data is ', data);
      return res.redirect(`/oneChat?user=${encodeURIComponent(userfriend)}&username=${encodeURIComponent(username)}`);
    } catch (error) {
      console.log(`error occured ${error}`);
      return res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
    }
  },

  /**
 * @name oneChatPollingAction
 * @file OneChatMessageController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will handle poll messages to the database.
 * @author Deepak (Zignuts)
 * */

  oneChatPollingAction: async function (req, res) {
    try {
      // console.log("blah");
      const data = req.body;
      // console.log("Data=>", data);
      const result = await OneChatPollServer(data);
      return res.send(result);
    } catch (error) {
      console.error('Error handling POST request:', error.message);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
};

