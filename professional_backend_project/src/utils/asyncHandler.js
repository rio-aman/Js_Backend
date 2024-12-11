// const asyncHandler = () = {}
// const asyncHandler = (func) => () = (}
// const asyncHandler = (func) => async () => (}


    // try catch wala 
// const asyncHandler = (fn)=>async (req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

// promises wala handler function

const asyncHandler = async (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    }
}

export {asyncHandler}

// higher order function those functions which can return and use the function or higher order function treat them as variable 
