import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  type!: "Cappuccino" | "Espresso" | "Americano";
}
