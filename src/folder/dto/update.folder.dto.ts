import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFolderrDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
