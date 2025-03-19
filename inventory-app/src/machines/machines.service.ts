import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machine } from './entities/machine.entity';
import { CreateMachineDto, UpdateMachineDto } from './dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private machinesRepository: Repository<Machine>,
  ) {}

  async create(createMachineDto: CreateMachineDto): Promise<Machine> {
    const exists = await this.machinesRepository.findOne({
      where: { serialNumber: createMachineDto.serialNumber },
    });
    if (exists) {
      throw new ConflictException('El número de serie ya está registrado.');
    }
    const machine = this.machinesRepository.create(createMachineDto);
    return this.machinesRepository.save(machine);
  }

  findAll(): Promise<Machine[]> {
    return this.machinesRepository.find();
  }

  async findOne(id: string): Promise<Machine> {
    const machine = await this.machinesRepository.findOne({ where: { id } });
    if (!machine) {
      throw new NotFoundException('Máquina no encontrada.');
    }
    return machine;
  }

  async update(
    id: string,
    updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    await this.findOne(id);
    await this.machinesRepository.update(id, updateMachineDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.machinesRepository.delete(id);
  }
}
