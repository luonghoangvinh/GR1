import {
    IsString,
    MinLength,
} from 'class-validator';

export class LoginDto {
    @IsString()
    gmail!: string;

    @MinLength(6)
    password!: string;
}