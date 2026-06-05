import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
    ExerciseProgress,
    ExerciseProgressSchema,
} from './exercise-progress.entity';
import { ExerciseProgressController } from './exercise-progress.controller';
import { ExerciseProgressService } from './exercise-progress.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ExerciseProgress.name,
                schema: ExerciseProgressSchema,
            },
        ]),
    ],
    controllers: [ExerciseProgressController],
    providers: [ExerciseProgressService],
    exports: [MongooseModule, ExerciseProgressService],
})
export class ExerciseProgressModule { }