const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('books');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('books');
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    book: async (parent, { bookId }) => {
      return Book.findOne({ _id: bookId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('books');
      }
      throw AuthenticationError;
    },
  },
};


  module.exports = resolvers;