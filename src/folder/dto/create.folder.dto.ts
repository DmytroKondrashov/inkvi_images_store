import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFolderrDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
