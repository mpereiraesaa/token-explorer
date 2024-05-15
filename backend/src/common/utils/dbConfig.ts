import { DataSource } from 'typeorm';

import { env } from '@/common/utils/envConfig';

const isProduction = env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: env.DB_URI,
  database: env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [],
  synchronize: !isProduction, // Synchronize entities with the database schema (not recommended in production)
  logging: !isProduction,
});

export const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
  }
};
