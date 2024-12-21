import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// for generating access and refresh token for login
const generateAccessAndRefreshTokens = async(userId) => {
  try{
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    // by above user.refreshtoken the refresh token will save in database
    await user.save({validateBeforeSave: false})

    return {accessToken , refreshToken}

  }catch (error) {
    throw new ApiError(500,"Something went wrong while generating access and refresh token")
  }
}

const registerUser = asyncHandler(async (req, res) => {
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
  const { fullname, email, username, password } = req.body;
  console.log("request body : ", req.body);

  // // 2 step
  // firstly write something in user.routes form line 7 to 19
  // // then below work

  //    if(fullname === ""){
  //     throw new ApiError(400,"fullname is required")
  //    }
  // advance way to check all field in less code
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // // 3 step
  const existedUser = await User.findOne({
    // OPERATORS USING
    $or: [{ username }, { email }],
  });
  console.log("existeduser: ", existedUser);

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // // 4 step

  const avatarLocalPath = req.files.avatar[0].path;
  const coverImageLocalPath = req.files.CoverImage[0].path;  // THIS COMMINTED BECAUSE showing cannot read properties (required 0) wale error aarahi thi isleyia

  // let coverImageLocalPath;
  // if(req.files && Array.isArray(req.files.CoverImaage) && req.files.CoverImage.length > 0){
  //   coverImageLocalPath = req.files.CoverImaage[0].path;
  // }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // // 5 step (upload to cloudinary)
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  console.log("avatar ------------------------ ", avatar);
  console.log("coverImage ------------------------ ", coverImage);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  // // 6 step
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // // 7 step

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  console.log("createdUser -------------------- ", createdUser);
  // // 8 step
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // // 9 step
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req,res) => {
  // req body -> data
  // username or email
  // find the user
  // password check 
  // access and refresh token need to generate and give to user
  // send these tokens in form of cookies to user
  // // try to write by ownself 

  const {email,username,password} = req.body

  if(!(username || email)){
    throw new ApiError(400,"Username or password is required ")
  }

  const user = await User.findOne({
    $or : [{username},{email}]
  })

  if(!user){
    throw new ApiError(404,"User does not exists")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if(!isPasswordValid){
    throw new ApiError(401,"Invalid User Password")
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

  // wapase databse ko call karne ka agar expensive yani bhut kuch aaraha ahi to uper wale user me he update kardo
  // agar nahi to call karlo 

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    // if httpOnly and secure is false then cookies can be modiies by frontend also 
    // but if true then it only modified by server 
    httpOnly: true,
    secure: true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    // below we doing bcz maybe user wants to save access and refresh tokens by own needs
    new ApiResponse(
      200,
      {
        user: loggedInUser, accessToken, refreshToken
      },
      "User logged In SuccessFully"
    )
  )

});

const logoutUser = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined
        }
      },
      {
        new: true
      }
    )

    const options = {
      httpOnly: true,
      secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {} , "User Logged Out Successfully "))
})

const refreshAccessToken = asyncHandler(async(req,res)=> {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
      throw new ApiError(401,"Unauthorized request")
    }

    try {
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      )
      const user = await User.findById(decodedToken?._id)
  
      if(!user){
        throw new ApiError(401,"Invalid Refresh token")
      }
  
      if(incomingRefreshToken !== user?.refreshToken){
        throw new ApiError(401,"Refresh Token is expired or used")
      }
  
      const options = {
        httpOnly: true,
        secure: true
      }
  
      const {accessToken ,newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
  
      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {accessToken, refreshToken : newRefreshToken},
          "Acess Token Refreshed"
        )
      )
  
    } catch (error) {
      throw new ApiError(401, "Invalid Refresh Token")
    }  
});

export { registerUser , loginUser , logoutUser , refreshAccessToken };

