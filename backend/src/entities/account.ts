import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('accounts')
export class Account {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column({ type: 'string' })
  address?: string;

  @Column({ type: 'string' })
  chain?: string;
}
