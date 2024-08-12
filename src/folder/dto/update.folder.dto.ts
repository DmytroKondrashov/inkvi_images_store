import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFolderDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
