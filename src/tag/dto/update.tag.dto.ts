import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTagDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
