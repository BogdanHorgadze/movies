import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Uncorrect email' })
  readonly email: string;
  @IsString({ message: 'Should be a string' })
  readonly password: string;
}
