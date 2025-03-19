import {
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Machine } from './entities/machine.entity';
import { CreateMachineDto, UpdateMachineDto } from './dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private machinesRepository: Repository<Machine>,
  ) {}

  async create(createMachineDto: CreateMachineDto): Promise<Machine> {
    createMachineDto.serialNumber = createMachineDto.serialNumber
      .toLowerCase()
      .trim();
    try {
      const machine = this.machinesRepository.create(createMachineDto);
      return await this.machinesRepository.save(machine);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        this.handleDbError(error);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  findAll(): Promise<Machine[]> {
    return this.machinesRepository.find();
  }

  async findOne(id: string): Promise<Machine> {
    const machine = await this.machinesRepository.findOne({ where: { id } });
    if (!machine) {
      throw new BadRequestException(`Machine with ID ${id} not found`);
    }
    return machine;
  }

  async update(
    id: string,
    updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    try {
      const machine = await this.machinesRepository.preload({
        id,
        ...updateMachineDto,
      });
      if (!machine) {
        throw new BadRequestException(`Machine with ID ${id} not found`);
      }
      return await this.machinesRepository.save(machine);
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const machine = await this.findOne(id);
    try {
      await this.machinesRepository.remove(machine);
      return {
        message: `Machine with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not delete machine with ID ${id}`,
      );
    }
  }

  private handleDbError(error: unknown): never {
    if (error instanceof QueryFailedError) {
      const dbError = error as QueryFailedError & { code?: string };

      if (dbError.code === '23505') {
        throw new ConflictException('Serial number already exists.');
      }
    }

    throw new InternalServerErrorException('Unexpected database error');
  }
}
