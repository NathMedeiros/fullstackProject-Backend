import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./users.entites";

@Entity("contacts")
export class Contacts {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45 })
  email: string;

  @Column({ type: "varchar", length: 12 })
  phone: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @ManyToOne(() => User, (users) => users.contacts)
  @JoinColumn()
  user: User;
}
