import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ExerciseProgress } from './exercise-progress.entity';
import { CreateExerciseProgressDto } from './dto/create-exercise-progress.dto';
import { UpdateExerciseProgressDto } from './dto/update-exercise-progress.dto';

@Injectable()
export class ExerciseProgressService {
    constructor(
        @InjectModel(ExerciseProgress.name)
        private readonly progressModel:
            Model<ExerciseProgress>,
    ) { }
    async findAll() {
        return this.progressModel.find().exec();
    }

    async findByUserId(userId: string) {
        return this.progressModel.find({ userId: new Types.ObjectId(userId) }).exec();
    }


    async create(
        dto: CreateExerciseProgressDto,
    ) {
        return this.progressModel.create({
            ...dto,
            userId: new Types.ObjectId(dto.userId),
            exerciseId: new Types.ObjectId(dto.exerciseId),
        });
    }

    async findById(id: string) {
        const progress =
            await this.progressModel.findById({ _id: new Types.ObjectId(id) });

        if (!progress) {
            throw new NotFoundException(
                'Progress not found',
            );
        }

        return progress;
    }

    async update(
        id: string,
        dto: UpdateExerciseProgressDto,
    ) {
        const progress =
            await this.progressModel.findOneAndUpdate(
                { _id: new Types.ObjectId(id) },
                {
                    ...dto,
                    userId: dto.userId ? new Types.ObjectId(dto.userId) : undefined,
                    exerciseId: dto.exerciseId ? new Types.ObjectId(dto.exerciseId) : undefined,
                },
                {
                    returnDocument: 'before'
                }
            );

        if (!progress) {
            throw new NotFoundException(
                'Progress not found',
            );
        }

        return progress;
    }

    async delete(id: string) {
        const progress =
            await this.progressModel.findByIdAndDelete({ _id: new Types.ObjectId(id) });

        if (!progress) {
            throw new NotFoundException(
                'Progress not found',
            );
        }

        return progress;
    }
}