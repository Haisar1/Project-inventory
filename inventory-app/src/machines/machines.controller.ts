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
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('machines')
@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva máquina' })
  @ApiResponse({ status: 201, description: 'La máquina ha sido creada.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  create(@Body() createMachineDto: CreateMachineDto): Promise<Machine> {
    return this.machinesService.create(createMachineDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las máquinas' })
  @ApiResponse({ status: 200, description: 'Lista de máquinas.' })
  findAll(): Promise<Machine[]> {
    return this.machinesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una máquina por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la máquina.' })
  @ApiResponse({ status: 404, description: 'Máquina no encontrada.' })
  findOne(@Param('id') id: string): Promise<Machine> {
    return this.machinesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una máquina por ID' })
  @ApiResponse({ status: 200, description: 'La máquina ha sido actualizada.' })
  @ApiResponse({ status: 404, description: 'Máquina no encontrada.' })
  update(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    return this.machinesService.update(id, updateMachineDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar una máquina por ID' })
  @ApiResponse({ status: 204, description: 'La máquina ha sido eliminada.' })
  @ApiResponse({ status: 404, description: 'Máquina no encontrada.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.machinesService.remove(id);
  }
}
