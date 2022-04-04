import Express, { Application } from 'express'
import authRouter from './routes/auth';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

export class App {
    // main express app
    private expressApp: Application = Express();
    // app port
    private PORT = process.env.PORT || 3000;
    // config the app
    configApp(){
        this.expressApp.use(Express.json())
    }
    // implements routes
    runRoutes(){
        // auth routes
        this.expressApp.use("/auth", authRouter)
    }
    // config database
    configDataBase(){
        // databaseUrl
        const dataBaseUrl = process.env.ATLAS_DATABASE_URL!;
        mongoose.connect(dataBaseUrl)
        .then(() => console.log("database is connected"))
        .catch(err => console.log(err))
    }
    // bootstrap method
    bootstrap(){
        // config the app
        this.configApp()
        // config env vars
        dotenv.config()
        // config database
        this.configDataBase()
        // run the app routes
        this.runRoutes()
        // run the app
        this.expressApp.listen(this.PORT, () => console.log("ReceipsApp is Running on PORT", this.PORT)
        )
    }
}