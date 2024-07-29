import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{7,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, no spaces, and be at least 7 characters long',
  })
  password: string;
}
