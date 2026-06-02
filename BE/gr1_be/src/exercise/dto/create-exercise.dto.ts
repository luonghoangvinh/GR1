import {
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

import {
    JLPTLevel,
    QuestionType,
    Difficulty,
} from '../exercise.entity';

export class CreateExerciseDto {
    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsEnum(QuestionType)
    type!: QuestionType;

    @IsEnum(JLPTLevel)
    level!: JLPTLevel;

    @IsNumber()
    questionCount!: number;

    @IsOptional()
    @IsNumber()
    timeLimit?: number;

    @IsEnum(Difficulty)
    difficulty!: Difficulty;

    @IsOptional()
    @IsNumber()
    score?: number;
}