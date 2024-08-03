import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFolderrDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
