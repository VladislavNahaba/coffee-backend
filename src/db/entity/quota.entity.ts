import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Coffee } from "./coffee.entity";
import { Membership } from "./membership.entity";

// I know that in task description was mentioned that i can hardcode this qouta inside, but i try to do it better and more universal
@Entity()
export class Quota {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  amount!: number;

  @Column()
  type!: "hourly" | "daily";

  @ManyToOne(() => Coffee)
  coffee!: Coffee;

  @ManyToOne(() => Membership, (membership) => membership.quotas)
  membership!: Membership;
}

// type Quota = {
//     coffee: Coffee;
//     type: "hourly" | "daily";
//     amount: number;
//   };
