import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFolderrDTO {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
