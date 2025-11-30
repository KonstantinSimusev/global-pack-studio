import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';

import { Production } from './entities/production.entity';

@Injectable()
export class ProductionRepository {
  constructor(
    @InjectRepository(Production)
    private readonly productionRepository: Repository<Production>,
  ) {}

  async create(production: Production): Promise<Production> {
    const newProduction = this.productionRepository.create(production);
    return await this.productionRepository.save(newProduction);
  }

  async findById(id: string): Promise<Production> {
    return await this.productionRepository.findOneBy({ id });
  }

  async update(
    production: Production,
    updateData: Partial<Production>,
  ): Promise<Production> {
    return await this.productionRepository.save({
      ...production,
      ...updateData,
    });
  }

  async findProductionsByShiftId(shiftId: string): Promise<Production[]> {
    return this.productionRepository.find({
      where: {
        shift: {
          id: shiftId,
        },
      },
    });
  }
}
