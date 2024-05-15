import { Account } from '@/common/entities/account';
import { AppDataSource } from '@/common/utils/dbConfig';

export const accountRepository = AppDataSource.getRepository(Account);
