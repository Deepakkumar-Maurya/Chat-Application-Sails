/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

let msgHistory = [];

/**
 * @name sendMessage
 * @file MessageController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This method will handle send message to the database.
 * @author Deepak (Zignuts)
 * */
// method for handling sending messages
sendMessage = async function (username, message) {
  console.log('sendMsgMid => ',username, message);

  try {
    console.log('sending message');
    const response = await axios.post('http://localhost:1337/api/messages/sendMsg', { username, message });
    msgHistory = response.data;
    return msgHistory;
  } catch (error) {
    console.log(`error at sending message ${error.message}`);
  }
};

/**
 * @name pollServer
 * @file MessageController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This method will handle poll messages to the database.
 * @author Deepak (Zignuts)
 * */
// method for handling polling messages
pollServer = async () => {
  try {
    console.log('polling');
    const response = await axios.get('http://localhost:1337/api/messages/getMsg');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Error fetching messages: ', error.message);
  }
};

module.exports = {

  /**
 * @name getMsgAPI
 * @file MessageController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will get all messages from the database.
 * @author Deepak (Zignuts)
 * */
  getMsgAPI: async function (req, res) {
    console.log('getMsgAction');
    try {
      Message.find({}).exec(async (err, result) => {
        if (err) {
          // console.log(`error in fetching messages ${error}`);
          return res.serverError('Error fetching messages');
        } else {
          return res.json(result);
        }
      });
    } catch (error) {
      console.error('Error handling POST request:', error.message);
      return res.status(500).json({
        error: error.message,
        message: 'Internal server error',
      });
    }
  },

  /**
 * @name sendMsgAPI
 * @file MessageController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will send a message to the database.
 * @author Deepak (Zignuts)
 * */

  sendMsgAPI: async function (req, res) {
    // const {username, message} = req.body;
    console.log('1122',req.body);
    const username = req.body.username;
    const message = req.body.message;
    console.log('sendMsgAction =>',username, message);

    try {
      Message.create({
        name: username,
        message: message,
      }).exec(async (error, result) => {
        if (error) {
          console.log(`error in sending Message ${error}`);
        } else {
          Message.find({}).exec(async (error, result) => {
            if (error) {
              console.log(`error in fetching messages ${error}`);
            } else {
              return res.json(result);
            }
          });
        }
      });
    } catch (error) {
      console.error('Error handling POST request:', error.message);
      return res.status(500).json({
        error: error.message,
        message: 'Internal server error',
      });
    }
  },

  /**
 * @name msgSendAction
 * @file MessageController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will handle message send request from client side.
 * @author Deepak (Zignuts)
 * */

  msgSendAction: async function (req, res) {
    try {
      const username = req.body.username;
      const message = req.body.newmsg;
      console.log('msgSendAction => ',username, message);
      const data = await sendMessage(username, message);
      return res.redirect(`/chats?username=${username}`);
    } catch (error) {
      console.error('Error handling POST request:', error.message);
      return res.status(500).json({
        error: error.message,
        message: 'Internal server error',
      });
    }
  },

  /**
 * @name pollingAction
 * @file MessageController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will handle polling request from client side.
 * @author Deepak (Zignuts)
 * */

  pollingAction: async function (req, res) {
    try {
      const data = await pollServer();
      res.send(data);
    } catch (error) {
      console.error('Error handling POST request:', error.message);
      return res.status(500).json({
        error: error.message,
        message: 'Internal server error',
      });
    }
  },

};

