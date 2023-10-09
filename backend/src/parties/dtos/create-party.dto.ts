import { IsString } from "class-validator";
import { Paslon } from "src/paslons/entity/paslon.entity";

export default class CreatePartyDto {
  @IsString()
  name: string;

  @IsString()
  paslon: Paslon;
}