import { IsNotEmpty, IsString } from 'class-validator';

export class ImageDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  folderId: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}
