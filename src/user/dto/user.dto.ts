import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
