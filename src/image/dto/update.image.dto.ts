import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateImageDTO {
  @IsNotEmpty()
  @IsString()
  fileName: string;
}
