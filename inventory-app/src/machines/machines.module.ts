import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';

@Module({
  controllers: [MachinesController],
  providers: [MachinesService],
  imports: [ConfigModule, TypeOrmModule.forFeature([Machine])],
  exports: [TypeOrmModule],
})
export class MachinesModule {}
