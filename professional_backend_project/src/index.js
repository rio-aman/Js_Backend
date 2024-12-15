//database ke connection ke time to error ayengi he ayengi to two ways to prevent 
// 1- use try catch 
// 2 - use promises

// and one more thing database are always in differnt country so time lagta hai database ke connect me to async and await must hai use karo 
// require('dotenv').config({path: './env'})  // but this affect the code consistency so we write below code of dotenv 
import dotenv from 'dotenv'

// FIRST APPROACH (writing all things in this file for connection)
/* 
import express from 'express'
const app = express()

// function connectDB(){}  // ONE WAY 

// IFF function 
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (error)=> {
            console.log("ERROR : ",error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR :",error)
        throw error
    }

} )()
*/

// SECOND APPROACH  (writing all connections in db/db.js then importing in this file)

import connectDB from './db/db.js';
import {app} from './app.js'

dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed !! ",err);
    
})