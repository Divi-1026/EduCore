import {configDotenv} from 'dotenv'
configDotenv({})
export const ENV={
    Mongo_Url:process.env.Mongo_Url,
    JWT_SECRET:process.env.JWT_SECRET,
    ADMIN:process.env.ADMIN,
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUD_API_KEY:process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET:process.env.CLOUD_API_SECRET,
    GEMINI_API_KEY:process.env.GEMINI_API_KEY,
    STRIPE_PUBLIC_KEY:process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY
}