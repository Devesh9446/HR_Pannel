import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app=express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(bodyParser.json()); 

app.use(express.static("public"))

import candidateRoutes from './routes/candidate.routes.js'
app.use("/HR",candidateRoutes)

export {app}