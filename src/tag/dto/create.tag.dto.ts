import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
