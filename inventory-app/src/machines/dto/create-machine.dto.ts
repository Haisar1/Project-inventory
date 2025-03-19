import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { MachineStatus } from './../entities/machine.entity';

export class CreateMachineDto {
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsNotEmpty()
  @Length(1, 50)
  model: string;

  @IsNotEmpty()
  serialNumber: string;

  @IsOptional()
  location?: string;

  @IsEnum(MachineStatus)
  @IsOptional()
  status?: MachineStatus;
}
