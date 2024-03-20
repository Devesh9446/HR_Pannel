import express from 'express'
import cors from 'cors'

const app=express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.static("public"))

import candidateRoutes from './routes/candidate.routes.js'
app.use("/HRpannel",candidateRoutes)

export {app}