import { IsDateString, IsPositive, IsString } from "class-validator";

export class CreateTallerDto {
  @IsString()
  titulo: string;
  @IsDateString()
  fecha: string;
  @IsPositive()
  creditos: number;
}
