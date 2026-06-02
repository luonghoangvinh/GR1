import {
    IsMongoId,
    IsNumber,
} from 'class-validator';

export class CreateExerciseProgressDto {
    @IsMongoId()
    userId!: string;

    @IsMongoId()
    exerciseId!: string;

    @IsNumber()
    score!: number;

    @IsNumber()
    totalQuestion!: number;

    @IsNumber()
    rightAnswer!: number;
}