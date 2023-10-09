import { IsArray, IsString } from "class-validator";

export default class CreatePaslonDto {
  @IsString()
  name: string;

  @IsString()
  visi: string;

  @IsArray()
  parties: string[];
}