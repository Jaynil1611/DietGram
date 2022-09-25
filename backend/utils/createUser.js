const { User } = require("../models/user.model");

async function createUser() {
  try {
    const user = new User({
      username: "dietgram",
      email: "dietgram@test.com",
      password: "12345g",
      username: "diet_gram",
      firstname: "diet",
      lastname: "gram",
    });
    await user.save();
  } catch (error) {
    console.error("Error while registering user", error.message);
  }
}

//userId: 60c1bf871b212911eca8110a

module.exports = { createUser };
