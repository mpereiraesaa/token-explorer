import { AppDataSource } from '@/common/utils/dbConfig';
import { Account } from '@/entities/account';

export const accountRepository = AppDataSource.getRepository(Account);
