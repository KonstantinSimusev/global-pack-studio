import 'dotenv/config';

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url:
      process.env.DB_ADDRESS || 'postgresql://postgres:password@localhost:5432/gps',
  },
};
