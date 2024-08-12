import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFolderDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
