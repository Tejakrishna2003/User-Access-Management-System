import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: ["Employee", "Manager", "Admin"], default: "Employee" })
  role!: "Employee" | "Manager" | "Admin";
}