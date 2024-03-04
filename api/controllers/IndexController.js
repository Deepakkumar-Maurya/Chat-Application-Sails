module.exports = {

  homePage: async function (req, res) {
    try {
      res.view('pages/home');
    } catch (error) {
      console.log(error.message);
    }
  },

  signupPage: async function (req, res) {
    try {
      res.view('pages/signup');
    } catch (error) {
      console.log(error.message);
    }
  },

  loginPage: async function (req, res) {
    try {
      res.view('pages/login');
    } catch (error) {
      console.log(error.message);
    }
  },

  chatsPage: async function (req, res) {
    try {
      let username = req.session.username;
      res.view('pages/chats', { username });
    } catch (error) {
      console.log(error.message);
    }
  },

  oneChatPage: async function (req, res) {
    try {
      // Retrieve the user parameter from the query string
      const userfriend = req.query.user;
      const username = req.query.username;
      // console.log(username,"ssssssss")
      const userfriendDetails = await User.findOne({ name: userfriend });

      // Render the 'oneChat' view and pass the user parameter
      return res.view('pages/oneChat', { username, userfriend, userfriendDetails });
    } catch (err) {
      console.error("Error in oneChatAction:", err);
      return res.serverError("Internal Server Error");
    }
  }

};
