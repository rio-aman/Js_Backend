import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async(req, _ ,next) => {
    // if res not use so replace it with underscore as a production point of view thing
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        // _id bcz we given in user.models 
    
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user = user;
        next();
    
        // middlewares mainly use in routes
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Access Token")
    }
})

// shortcut of vscode to get the code uner try catch 
// select the code and start try and select trycatch with black box on side and enter it will get in try and catch 