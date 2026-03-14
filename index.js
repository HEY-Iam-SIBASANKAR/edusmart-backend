import express from 'express'
import { connectDB } from './src/config/db.js'
import { ENV } from './src/config/env.js'
import cookieParser from 'cookie-parser'
import userRoute from './src/routes/user.route.js'
import courseRoute from './src/routes/course.route.js'
import moduleRoute from './src/routes/module.routes.js'
import quizRoute from './src/routes/quiz.route.js'
import commentRoute from './src/routes/comment.route.js'
import paymentRoute from './src/routes/payment.route.js'
import analyticRoute from './src/routes/analytic.route.js'
import cors from 'cors'

const app = express()
app.set('trust proxy', 1)

app.use(cors({
    origin: [ENV.CLIENT_URL, "http://localhost:5173"],
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization","Cookie"]
}))

app.options('*', cors())

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api', userRoute)
app.use('/api/course', courseRoute)
app.use('/api/module', moduleRoute)
app.use('/api/quiz', quizRoute)
app.use('/api/comment', commentRoute)

app.use('/api/payment', paymentRoute)
app.use('/api/analytic', analyticRoute)




app.listen(ENV.PORT,()=>{
    console.log("server started", ENV.PORT)
    connectDB()
})