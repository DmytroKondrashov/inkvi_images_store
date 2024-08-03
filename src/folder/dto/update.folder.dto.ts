import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFolderrDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
