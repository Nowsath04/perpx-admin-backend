// create new page
const asyncHandler = require("../utils/asyncHandler")
const AWS = require("aws-sdk")
const dotenv = require("dotenv").config()
const fs = require("fs")
const ErrorHandler = require("../utils/ErrorHandler")
const Pages = require("../models/pageModel")


const bucketName = process.env.aws_bucket;
const awsConfig = ({
    accessKeyId: process.env.AccessKey,
    secretAccessKey: process.env.SecretKey,
    region: process.env.region,
})

const S3 = new AWS.S3(awsConfig);
const uploadToS3 = (fileData) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            Key: `${Date.now().toString()}.jpg`,
            Body: fileData,
        };
        S3.upload(params, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data.Location);
        });
    });
};

exports.NewPage = asyncHandler(async (req, res, next) => {
    const { meta_title, meta_description, meta_keywords, page } = req.body;
    console.log(req.body);

    if (!req.file) {
        return next(new ErrorHandler("Select The Image", 401));
    }

    const imagePath = req.file.path;
    const blob = fs.readFileSync(imagePath);

    try {
        const existingPage = await Pages.findOne({ page });
        if (existingPage) {
            return next(new ErrorHandler('Page with this category already exists.', 400));
        }

        let data = await uploadToS3(blob);
        const newPage = await Pages.create({ imageurl: data, meta_title, meta_description, meta_keywords, page });

        res.status(201).json({
            success: true,
            newPage,
        });
    } catch (error) {
        console.error('Error creating new page:', error);
        return next(new ErrorHandler('Internal Server Error', 500));
    } finally {
        fs.unlinkSync(imagePath);
    }
});


// get all page

exports.getAllpage = asyncHandler(async (req, res, next) => {

    const allpage = await Pages.find()

    res.status(200).json({
        success: true,
        allpage
    })
})

// get single page

exports.GetSinglePage = asyncHandler(async (req, res, next) => {
    const singlePage = await Pages.findById(req.params.id)

    res.status(200).json({
        success: true,
        singlePage
    })
})


exports.UpdateSinglePage = asyncHandler(async (req, res, next) => {
    const { meta_title, meta_description, meta_keywords, page } = req.body
    try {
        if (req.file) {
            const imagePath = req.file.path
            const blob = fs.readFileSync(imagePath)
            let data = await uploadToS3(blob);
            const updatedBlog = await Pages.findByIdAndUpdate(req.params.id, { imageurl: data,  meta_title, meta_description, meta_keywords, page }, { new: true });
            return res.status(200).json({
                success: true,
                updatedBlog,
            });
        }
        const updatedBlog = await Pages.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedBlog) {
            return next(new ErrorHandler("Blog not found", 404));
        }

        res.status(200).json({
            success: true,
            updatedBlog,
        });
    } catch (error) {
        console.error("Update Error:", error);
        next(error);
    }
});