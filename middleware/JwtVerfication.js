const ErrorHandler = require("../utils/ErrorHandler")
const jwt = require("jsonwebtoken")
const asyncHandler = require("../utils/asyncHandler")
const Users = require("../models/userModels")



const jwtVerification = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
   return next(new ErrorHandler(" you are Unauthorized", 401))
  }
  jwt.verify(token, process.env.SECRET_key, async (err, decoded) => {
    if (err) {
     return next(new ErrorHandler("Invalied Token", 403))
    }
    req.user = await Users.findById(decoded.userId)
    next()
  })
})

module.exports = jwtVerification