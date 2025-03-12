const User = require('../models/User');

const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
  },
  
  Mutation: {
    addUser: async (_, { name, email }) => {
      const user = new User({ name, email });
      await user.save();
      return user;
    },
    
    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return "User deleted successfully";
    }
  }
};

module.exports = resolvers;
