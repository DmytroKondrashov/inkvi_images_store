import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFolderrDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
