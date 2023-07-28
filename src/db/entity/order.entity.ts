import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from "typeorm";
import { Coffee } from "./coffee.entity";
import { User } from "./user.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Coffee)
  coffee!: Coffee;

  @ManyToOne(() => User)
  user!: User;

  @CreateDateColumn()
  created_at!: Date;
}
