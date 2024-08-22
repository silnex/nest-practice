import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInset() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  lotUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  lotRemove() {
    console.log('Updated User with id', this.id);
  }
}
