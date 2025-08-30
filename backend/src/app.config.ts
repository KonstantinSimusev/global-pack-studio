import 'dotenv/config';

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url:
      process.env.DB_ADDRESS ||
      'postgresql://postgres:password@localhost:5432/gps',
  },
  jwt: {
    access: {
      secret: process.env.ACCESS_TOKEN_SECRET || 'default-access-secret',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '1h',
    },
    refresh: {
      secret: process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
    },
  },
};
