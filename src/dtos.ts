import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @Length(6)
  public password: string;
}
