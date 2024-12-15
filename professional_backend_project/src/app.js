import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

// routes import 
import userRouter from './routes/user.routes.js'

// routes declaration (route ko khi or lekine ke vajaha se mhe route ko lane ke leyia middlewares ka use karna pdega)
app.use("/api/v1/users",userRouter)  
// yaha kya hoga jaise he /users tak aagya fir iske bd controll userRouter ko pass hojayega

export { app }
// jab async function complete hota hai to promises bhi return karta hai

// sirf request and response nahi hota hai there are 4 elements (err,req,res,next)