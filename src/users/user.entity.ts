import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { hash } from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', unique: true })
  public email: string;

  @Column({ type: 'varchar' })
  public password: string;
  @BeforeInsert()
  @BeforeUpdate()
  async bcryptPassword() {
    this.password = await hash(
      this.password,
      Number(process.env.BCRYPT_ROUNDS),
    );
  }
}
