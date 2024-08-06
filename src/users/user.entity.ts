import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
