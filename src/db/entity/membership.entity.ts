import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Quota } from "./quota.entity";

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: "basic" | "coffee-lover" | "americano-maniac";

  @OneToMany(() => Quota, (quota) => quota.membership)
  quotas!: Quota[];
}

// type Membership = {
//     name: string;
//     id: "basic" | "coffee-lover" | "americano-maniac";
//     quotas: Quota[];
//   };
