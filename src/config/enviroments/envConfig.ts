export const EnvConfig = () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: parseInt(process.env.DB_PORT || '5432', 10),
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'password',
  dbName: process.env.DB_NAME || 'payment_school',
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret_key_for_dev_change_it_in_prod',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
});