import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  id:number;


  @Column({ type: String })
  name: string;

  @Column({type:String})
  profilePic: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
