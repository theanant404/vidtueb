import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import uoloadOnCloudinary from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import { User } from '../models/user.models.js';
const registerUser = asyncHandler(async (req, res) => {
    const {fullname, username, email, password} = req.body; 
    if(
        [fullname,username,email,password].some((field=>field?.trim()===''))
    ){
        throw new ApiError(400,'All fields are required');
    }
    // check if user already exists
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(400,`User with ${username?'username':'email'} already exists`);
    }
    let avatarLocalPath;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length>0){
        avatarLocalPath=req.files.avatar[0].path;
    }
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path;
    }
    // console.log(req.files)
    console.log(avatarLocalPath)
    console.log(coverImageLocalPath)
    if(!avatarLocalPath || !coverImageLocalPath){
        throw new ApiError(400,'avatar and cover image are required');
    }
    const avatar=await uoloadOnCloudinary(avatarLocalPath);
    const coverImage=await uoloadOnCloudinary(coverImageLocalPath);
    const user=await User.create({
        fullname,
        username:username.toLowerCase(),
        email:email.toLowerCase(),
        password,
        avatar:avatar.url,
        avatarPubId:avatar.public_id,
        coverImage:coverImage.url,
        coverImagePubId:coverImage.public_id
    });

    const createdUser=await User.findById(user._id).select('-password -refreshToken -accessToken');
    if(!createdUser){
        throw new ApiError(500,'User not created');
    }
    return res.status(201).json(new ApiResponse(201,{user:createdUser}));


});
export {registerUser};