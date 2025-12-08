import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Residue } from './entities/residue.entity';

import { ResidueController } from './residue.controller';
import { ResidueService } from './residue.service';
import { ResidueRepository } from './residue.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Residue]), AuthModule],
  controllers: [ResidueController],
  providers: [ResidueRepository, ResidueService],
  exports: [ResidueService],
})
export class ResidueModule {}
