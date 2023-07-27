import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Membership } from "./membership.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Membership)
  membership!: Membership;
}
