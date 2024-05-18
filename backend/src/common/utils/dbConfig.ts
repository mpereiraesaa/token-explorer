import { DataSource } from 'typeorm';

import { env } from '@/common/utils/envConfig';
import { Account } from '@/entities/account';

const isProduction = env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: env.DB_URI,
  database: env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [Account],
  synchronize: !isProduction, // Synchronize entities with the database schema (not recommended in production)
  logging: !isProduction,
});

export const getDataSource = async () => {
  try {
    await AppDataSource.initialize();
    return AppDataSource;
  } catch (err) {
    throw new Error('Error during Data Source initialization.');
  }
};
