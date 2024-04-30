module.exports = {

  /**
 * @name homePage
 * @file IndexController.js
 * @param {Request} req
 * @param {Response} res
 * @throws 404 error
 * @description This action will render home page.
 * @author Deepak (Zignuts)
 * */

  homePage: async function (req, res) {
    try {
      return res.view('pages/home');
    } catch (error) {
      console.log(error.message);
      return res.status(404).json({
        error: error.message,
        message: 'Page not found',
      });
    }
  },

  /**
 * @name signupPage
 * @file IndexController.js
 * @param {Request} req
 * @param {Response} res
 * @throws 404 error
 * @description This action will render signup page.
 * @author Deepak (Zignuts)
 * */

  signupPage: async function (req, res) {
    try {
      return res.view('pages/signup');
    } catch (error) {
      console.log(error.message);
      return res.status(404).json({
        error: error.message,
        message: 'Page not found',
      });
    }
  },

  /**
 * @name loginPage
 * @file IndexController.js
 * @param {Request} req
 * @param {Response} res
 * @throws 404 error
 * @description This action will render login page.
 * @author Deepak (Zignuts)
 * */

  loginPage: async function (req, res) {
    try {
      return res.view('pages/login');
    } catch (error) {
      console.log(error.message);
      return res.status(404).json({
        error: error.message,
        message: 'Page not found',
      });
    }
  },

  /**
 * @name chatsPage
 * @file IndexController.js
 * @param {Request} req
 * @param {Response} res
 * @throws 404 error
 * @description This action will render chats page.
 * @author Deepak (Zignuts)
 * */

  chatsPage: async function (req, res) {
    try {
      // let username = req.session.username;
      let username = req.query.username;
      console.log(username,'ssssssss');
      return res.view('pages/chats', { username });
    } catch (error) {
      console.log(error.message);
      return res.status(404).json({
        error: error.message,
        message: 'Page not found',
      });
    }
  },

  /**
 * @name oneChatPage
 * @file IndexController.js
 * @param {Request} req
 * @param {Response} res
 * @throws 404 error
 * @description This action will render oneChat page.
 * @author Deepak (Zignuts)
 * */

  oneChatPage: async function (req, res) {
    try {
      // Retrieve the user parameter from the query string
      const userfriend = req.query.user;
      const username = req.query.username;
      // console.log(username,"ssssssss")
      const userfriendDetails = await User.findOne({ name: userfriend });

      // Render the 'oneChat' view and pass the user parameter
      return res.view('pages/oneChat', { username, userfriend, userfriendDetails });
    } catch (error) {
      console.error('Error in oneChatAction:', error);
      return res.serverError('Internal Server Error');
    }
  }

};
