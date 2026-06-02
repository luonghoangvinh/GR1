import {
    IsEmail,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    userName!: string;

    @IsEmail()
    gmail!: string;

    @MinLength(6)
    password!: string;
}