import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Uncorrect email' })
  readonly email: string;
  @IsString({ message: 'Should be a string' })
  @Length(4, 16, { message: 'Not less than 4 and not more than 16' })
  readonly password: string;
}
