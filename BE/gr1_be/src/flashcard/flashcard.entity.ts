import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { JLPTLevel } from "../exercise/exercise.entity";

@Schema({ _id: false })
export class Flashcard {
    @Prop()
    front!: string;

    @Prop()
    back!: string;

    @Prop({
        enum: ['vocabulary', 'grammar'],
    })
    type!: string;

    @Prop({
        enum: JLPTLevel,
    })
    level?: string;

    @Prop()
    example?: string;

    @Prop()
    image?: string;

    @Prop()
    audio?: string;

    @Prop()
    status?: string;
}
export const FlashcardSchema =
    SchemaFactory.createForClass(Flashcard);