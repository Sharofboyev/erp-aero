import dotenv from "dotenv";

dotenv.config();

export default {
  appPort: Number(process.env.APP_PORT) || 2000,
  secretKey: process.env.SECRET_KEY || "My secret key",
  refreshTokenSecretKey:
    process.env.REFRESH_TOKEN_SECRET_KEY || "Refresh token secret key",
  tokenLife: Number(process.env.TOKEN_LIFE) || 3000,
  refreshTokenLife: Number(process.env.REFRESH_TOKEN_LIFE),
  dbConfig: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME || "main",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "my password"
  }
};
