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

export { app }
// jab async function complete hota hai to promises bhi return karta hai

// sirf request and response nahi hota hai there are 4 elements (err,req,res,next)