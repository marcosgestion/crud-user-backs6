import mongoose from "mongoose"

import { env } from './env.js'

const connectDB = async () => {
    
    try {

        console.log('servidor conectado')

        await mongoose.connect(env.MONGO_URI)

        console.log('conectado correctamente')

    } catch (error) {

        console.log('error conectando MongoDB')

        console.log(error)

    }

}

