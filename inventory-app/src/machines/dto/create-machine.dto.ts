import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MachineStatus } from './../entities/machine.entity';

export class CreateMachineDto {
  @ApiProperty({ description: 'Nombre de la máquina', maxLength: 100 })
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @ApiProperty({ description: 'Modelo de la máquina', maxLength: 50 })
  @IsNotEmpty()
  @Length(1, 50)
  model: string;

  @ApiProperty({
    description: 'Número de serie de la máquina',
    uniqueItems: true,
  })
  @IsNotEmpty()
  serialNumber: string;

  @ApiProperty({ description: 'Ubicación de la máquina', required: false })
  @IsOptional()
  location?: string;

  @ApiProperty({
    enum: MachineStatus,
    description: 'Estado de la máquina',
    required: false,
  })
  @IsEnum(MachineStatus)
  @IsOptional()
  status?: MachineStatus;
}
