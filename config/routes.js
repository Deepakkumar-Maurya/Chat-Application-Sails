/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  'GET /' : 'IndexController.homePage',
  'GET /signup' : 'IndexController.signupPage',
  'GET /login' : 'IndexController.loginPage',
  'GET /chats' : 'IndexController.chatsPage',
  'GET /oneChat' : 'IndexController.oneChatPage',

  'POST /auth/signup': 'UserController.signupAction',
  'POST /auth/login': 'UserController.loginAction',
  'POST /auth/logout': 'UserController.logoutAction',

  'GET /api/messages/getMsg': 'MessageController.getMsgAPI',
  'POST /api/messages/sendMsg': 'MessageController.sendMsgAPI',
  'POST /api/messages/oneChatSendMsg': 'OneChatMessageController.oneChatSendMsgAPI',
  'POST /api/messages/oneChatGetMsg': 'OneChatMessageController.oneChatGetMsgAPI',

  'POST /msgsend': 'MessageController.msgSendAction',
  'POST /oneChatMsgSend': 'OneChatMessageController.oneChatMsgSendButtonAction',

  'GET /showUsers': 'UserController.getAllCurrentUsers',
  'GET /showAllUsers': 'UserController.getAllUsers',

  'GET /polling': 'MessageController.pollingAction',
  'POST /oneChatPolling': 'OneChatMessageController.oneChatPollingAction',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
