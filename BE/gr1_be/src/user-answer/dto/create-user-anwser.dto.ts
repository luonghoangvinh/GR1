import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsDate,
    IsMongoId,
    IsNumber,
    IsString,
    Min,
} from 'class-validator';

export class CreateUserAnswerDto {
    @IsMongoId()
    userId!: string;
    @IsMongoId()
    questionId!: string;

    @IsString()
    type?: string;

    @IsString()
    level?: string;

    @IsBoolean()
    isCorrect!: boolean;

    @IsNumber()
    @Min(0)
    timeSpent?: number;

    @Type(() => Date)
    @IsDate()
    answeredAt?: Date;
}