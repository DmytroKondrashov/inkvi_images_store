import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTagDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  imageId?: number;

  @IsOptional()
  @IsString()
  name?: string;
}
