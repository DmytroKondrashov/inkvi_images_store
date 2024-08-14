import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ImageDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  folderId: number;

  @IsNotEmpty()
  @IsString()
  url: string;
}
