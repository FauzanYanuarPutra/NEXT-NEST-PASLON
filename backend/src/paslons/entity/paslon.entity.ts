import { Party } from "src/parties/entity/party.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('paslons')
export class Paslon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  visi: string;

  @OneToMany(() => User, (user) => user.paslon)
  voter: User[]

  @OneToMany(() => Party, (party) => party.paslon)
  parties: Party[]
}
