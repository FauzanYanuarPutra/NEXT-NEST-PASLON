import { Paslon } from "src/paslons/entity/paslon.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('parties')
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Paslon, (paslon) => paslon.parties)
  paslon: Paslon;
}