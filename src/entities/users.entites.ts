import { getRounds, hashSync } from "bcryptjs";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  BeforeUpdate,
  BeforeInsert,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Contacts } from "./contact.entities";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", unique: true, length: 45 })
  email: string;

  @Column({ type: "varchar", length: 12 })
  phone: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => Contacts, (contacts) => contacts.user)
  contacts: Contacts[];
}
