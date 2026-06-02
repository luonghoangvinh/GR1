import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
    ActivityHistory,
    ActivityHistorySchema,
} from './activity-history.entity';
import { ActivityHistoryService } from './activity-history.service';
import { ActivityHistoryController } from './activity-history.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ActivityHistory.name,
                schema: ActivityHistorySchema,
            },
        ]),
    ],
    controllers: [ActivityHistoryController],
    providers: [ActivityHistoryService],
    exports: [MongooseModule, ActivityHistoryService],
})
export class ActivityHistoryModule { }