import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { User } from "./users.entites";

@Entity("contacts")
export class Contacts {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", unique: true, length: 45 })
  email: string;

  @Column({ type: "varchar", length: 15 })
  phone: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
