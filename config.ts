import dotenv from "dotenv";

dotenv.config();

export default {
    appPort: Number(process.env.APP_PORT) || 2000
}