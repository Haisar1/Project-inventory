import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto, UpdateMachineDto } from './dto';
import { Machine } from './entities/machine.entity';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  create(@Body() createMachineDto: CreateMachineDto): Promise<Machine> {
    return this.machinesService.create(createMachineDto);
  }

  @Get()
  findAll(): Promise<Machine[]> {
    return this.machinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Machine> {
    return this.machinesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    return this.machinesService.update(id, updateMachineDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    return this.machinesService.remove(id);
  }
}
