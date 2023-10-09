import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class UpdatePaslonDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  visi: string;

  @IsArray()
  @IsOptional()
  parties: string[];
}