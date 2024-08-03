import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFolderrDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
