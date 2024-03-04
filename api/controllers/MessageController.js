/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

let msgHistory = [];

sendMessage = async function (username, message) {
    console.log("sendMsgMid => ",username, message);

    try {
        console.log('sending message');
        const response = await axios.post('http://localhost:1337/api/messages/sendMsg', { username, message });
        msgHistory = response.data;
        return msgHistory;
    } catch (error) {
        console.log(`error at sending message ${error.message}`);
    }
};

pollServer = async () => {
    try {
        console.log('polling');
        const response = await axios.get('http://localhost:1337/api/messages/getMsg');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error fetching messages: ', error.message);
    }
}

module.exports = {
    getMsgAPI: async function (req, res) {
        console.log('getMsgAction');
        try {
          Message.find({}).exec(async (err, result) => {
            if (err) {
              // console.log(`error in fetching messages ${error}`);
              return res.serverError('Error fetching messages');
            } else {
              res.json(result);
            }
          });
        } catch (error) {
          console.error("Error handling POST request:", error.message);
          res.status(500).send("Internal Server Error");
        }
    },

    sendMsgAPI: async function (req, res) {
        // const {username, message} = req.body;
        console.log('1122',req.body);
        const username = req.body.username;
        const message = req.body.message;
        console.log('sendMsgAction =>',username, message)
        
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
                            res.json(result);
                        }
                    });
                }
            });
        } catch (error) {

        }
    },

    msgSendAction: async function (req, res) {
        const username = req.body.username;
        const message = req.body.newmsg;
        console.log("msgSendAction => ",username, message);
        const data = await sendMessage(username, message);
        return res.redirect('/chats');
    },
    
    
    pollingAction: async function (req, res) {
        const data = await pollServer();
        res.send(data);
    },

};

