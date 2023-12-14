const mongoose = require("mongoose");
const userShchema = new mongoose.Schema(
  {
    name: {
      required: [true, "please enter your name"],
      type: String,
    },
    email: {
      required: [true, "please enter your email"],
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      required: [true, "please enter your password"],
      type: String,
      validate: {
        validator: function (value) {
          // Custom password validation
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,7}$/.test(
            value
          );
        },
        message:
          "Password should have at least one lowercase, one uppercase, one special character, and a minimum length of 6.",
      },
    },
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userShchema);

module.exports = Users;
