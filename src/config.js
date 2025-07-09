import dotev from 'dotenv'

dotev.config()

export const config = {
    db: {
        URI: process.env.DB_URI
    },
    server: {
        port: process.env.PORT
    }
}