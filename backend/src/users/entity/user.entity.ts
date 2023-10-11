import { Exclude } from "class-transformer";
import { Paslon } from "src/paslons/entity/paslon.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @ManyToOne(() => Paslon, (paslon) => paslon.voter, { nullable: true })
  paslon: Paslon | null;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

