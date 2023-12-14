const Users = require("../models/userModels")
const ErrorHandler = require("../utils/ErrorHandler")
const asyncHandler = require("../utils/asyncHandler")
const bcrypt=require("bcrypt")
const createJwt = require("../utils/jwt")


// user register
exports.register = asyncHandler(async (req, res, next) => {

    const { email, name, password } = req.body
    if(!email && !password && !name){
        return next(new ErrorHandler("Pls Enter the All Field", 401))
    }
    if(!password){
       return next(new ErrorHandler("pls enter the password"))
    }
    // hashpassword
    const hashPassword = await bcrypt.hash(password, 10)


    let user = await Users.findOne({ email })
    if (user) {
        return next(new ErrorHandler("user already registed ", 401))
    }

    user = await Users.create({ email, name, password: hashPassword })
    createJwt(res, user)

})

// login user

exports.LoginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    if(!email && !password){
        return next(new ErrorHandler("Pls Enter the All Field", 401))
    }

    let user = await Users.findOne({ email })
    // check user is existed or not
    if (!user) {
        return next(new ErrorHandler("Invalied Credential", 401))
    }
    // check  the password is correct or not

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        return next(new ErrorHandler("Invalied Credential", 401))
    }
    createJwt(res, user)
})

// get loginUser Profile

exports.Myprofile = asyncHandler(async (req, res, next) => {
    let user = req.user
    console.log(req.user.id);
    user = await Users.findById(req.user.id)
    res.status(201).json({
        success: true,
        user
    })
})

// userLogout

exports.Userlogout = asyncHandler((req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "logout successfully"
    })

})

// update user
exports.UpdateUser = asyncHandler(async (req, res, next) => {

    const updatedetail = req.body

    const user = await Users.findByIdAndUpdate(req.user.id, req.body)

    res.status(201).json({
        success: true,
        user
    })



})