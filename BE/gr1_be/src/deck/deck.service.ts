import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Deck } from './deck.entity';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Injectable()
export class DeckService {
    constructor(
        @InjectModel(Deck.name)
        private readonly deckModel: Model<Deck>,
    ) { }

    async create(dto: CreateDeckDto) {
        return this.deckModel.create(dto);
    }

    async findAll() {
        return this.deckModel.find().exec();
    }

    async findById(id: string) {
        const deck = await this.deckModel.findById(id);

        if (!deck) {
            throw new NotFoundException('Deck not found');
        }

        return deck;
    }

    async update(
        id: string,
        dto: UpdateDeckDto,
    ) {
        const deck =
            await this.deckModel.findByIdAndUpdate(
                id,
                dto,
                { new: true },
            );

        if (!deck) {
            throw new NotFoundException('Deck not found');
        }

        return deck;
    }

    async delete(id: string) {
        const deck =
            await this.deckModel.findByIdAndDelete(id);

        if (!deck) {
            throw new NotFoundException('Deck not found');
        }

        return deck;
    }
}