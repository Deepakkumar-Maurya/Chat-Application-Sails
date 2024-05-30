/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


module.exports = {

  /**
 * @name signupAction
 * @file UserController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will handle signup request from client side.
 * @author Deepak (Zignuts)
 * */
  signupAction: async function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, 10);

    try {

      // ** validations
      if (!name ||!email ||!password) {
        return res.badRequest({ message: 'All fields are required'} );
      }
      if (password.length < 5) {
        return res.badRequest({ message: 'Password must be atleast 5 characters' });
      }
      if (password.length > 20) {
        return res.badRequest({ message: 'Password must be less than 20 characters' });
      }
      if (name.length < 3) {
        return res.badRequest({ message: 'Username must be atleast 3 characters' });
      }

      let existingUser = await User.findOne({ email: email });
      let existingUser1 = await User.findOne({ name: name });

      if (existingUser) {
        return res.badRequest({ message: 'Email already exists' });
      }
      if (existingUser1) {
        return res.badRequest({ message: 'Username already exists' });
      }

      let user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        isActive: false,
      }).fetch();

      return res.redirect('/login');

    } catch (error) {
      return res.serverError(error).redirect('/signup');
    }
  },

  /**
 * @name loginAction
 * @file UserController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will handle login request from client side.
 * @author Deepak (Zignuts)
 * */

  loginAction: async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      User.find({ email: email }).exec(async (error, users) => {
        if (error) {
          console.log(error.message);
          return res.status(500).json({
            message: 'Error finding user',
            error: error.message,
          });
        }
        if (users.length < 1) {
          console.log('No user found');
          return res.status(400).json({ error: 'No user found' });
        }
        let user = users[0];
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          console.log('Password is incorrect');
          return res.status(400).json({ error: 'Password is incorrect' });
        }
        console.log('User logged in');

        // req.session.username = user.name;

        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        req.session.token = token;

        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        const filter = { name: user.name }; // Your filter criteria
        const update = { isActive: true, authToken: token }; // Update fields
        await User.update(filter, update);

        return res.redirect(`/chats?username=${user.name}`);
      });
    } catch (error) {
      return res.serverError(error).redirect('/login');
    }

  },

  /**
 * @name logoutAction
 * @file UserController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This action will handle logout request from client side.
 * @author Deepak (Zignuts)
 * */

  logoutAction: async function (req, res) {
    try {
      const name = req.body.username;
      const user = await User.findOne({ name: name });

      const filter = { name: user.name };
      const update = { isActive: false, authToken: ''};

      await User.update(filter, update);

      res.clearCookie('token');
      console.log('User logged out');

      return res.redirect('/');
    } catch (error) {
      console.log('Logout error:', error.message);
      return res.serverError({ message: 'Error in logging out' });
    }

  },

  /**
 * @name getAllUsers
 * @file UserController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This method will get all the users.
 * @author Deepak (Zignuts)
 * */

  getAllUsers: async function (req, res) {
    console.log('showAllUsers');
    try {
      const allUsers = await User.find({});
      const allUserList = allUsers.map(user => user.name);

      return res.json(allUserList);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.serverError({ message: 'Error fetching users' });
    }
  },

  /**
 * @name getAllCurrentUsers
 * @file UserController.js
 * @param {Request} req
 * @param {Response} res
 * @throws NotAuthorizedException
 * @description This method will get all current logged in users.
 * @author Deepak (Zignuts)
 * */

  getAllCurrentUsers: async function (req, res) {
    try {
      const filter = {isActive: true};
      const result = await User.find(filter);
      const currentUsers = result.map(user => user.name);
      return res.json(currentUsers);
    } catch (error) {
      console.log(error.message);
      return res.serverError({ message: 'Error fetching current users' });
    }
  }
};
