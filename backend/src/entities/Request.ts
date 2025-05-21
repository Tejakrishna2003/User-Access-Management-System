import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Software } from "./Software";

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Software)
  software!: Software;

  @Column({ type: "enum", enum: ["Read", "Write", "Admin"] })
  accessType!: "Read" | "Write" | "Admin";

  @Column("text")
  reason!: string;

  @Column({ type: "enum", enum: ["Pending", "Approved", "Rejected"], default: "Pending" })
  status!: "Pending" | "Approved" | "Rejected";
}