/**
 * OneChatMessage.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    sendername: {
      type:'string',
      required: true,
    },
    receivername: {
      type:'string',
      required: true,
    },
    message: {
      type:'string',
      required: true,
    }

  },

};

