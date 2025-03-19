import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { MachineStatus } from './../entities/machine.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineDto {
  @ApiProperty({
    example: 'Excavator 3000',
    description: 'The name of the machine',
  })
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @ApiProperty({ example: 'XK-200', description: 'The model of the machine' })
  @IsNotEmpty()
  @Length(1, 50)
  model: string;

  @ApiProperty({
    example: 'ABC12345',
    description: 'Unique serial number',
    uniqueItems: true,
  })
  @IsNotEmpty()
  serialNumber: string;

  @ApiProperty({
    example: 'Warehouse A',
    description: 'Location of the machine',
  })
  @IsOptional()
  location?: string;

  @ApiProperty({
    example: 'active',
    description: 'Machine status',
    enum: MachineStatus,
  })
  @IsEnum(MachineStatus)
  @IsOptional()
  status?: MachineStatus;
}
