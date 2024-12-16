import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler( async (req,res) => {
    // steps for register 
    // 1) get user details from frontend
    // 2) apply validation all possible  (atleast check this validation that all the things are not empty)
    // 3) check if user already exists:  check by username and email
    // 4) check for images, check for avatar(compulsory)
    // 5) then upload them to cloudinary, check their is avatar or not 
    // 6) create user object - create entry in db
    // 7) remove password and refresh token field from response
    // 8) check for user creation 
    // 9) return res (response)

// // 1 step
   const {fullname,email,username,password} = req.body
   console.log("request body : ",req.body);


// // 2 step 
// firstly write something in user.routes form line 7 to 19 
// // then below work

//    if(fullname === ""){
//     throw new ApiError(400,"fullname is required")
//    }
// advance way to check all field in less code
    if(
        [fullname,email,username,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

// // 3 step
    const existedUser = User.findOne({
        // OPERATORS USING
        $or: [{ username }, { email }]
    }) 
    console.log("existeduser: ",existedUser);

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

// // 4 step
   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
   }

// // 5 step (upload to cloudinary)
   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400, "Avatar file is required")
   }

// // 6 step
   const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })

// // 7 step

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

// // 8 step 
   if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user")
   }

// // 9 step
return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
)

})

export {
    registerUser,
}