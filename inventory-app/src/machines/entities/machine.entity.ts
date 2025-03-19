import { MaxLength, IsEnum } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum MachineStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
}

@Entity('machines')
export class Machine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  @MaxLength(100)
  name: string;

  @Column('text')
  @MaxLength(50)
  model: string;

  @Column('text', { unique: true })
  serialNumber: string;

  @Column('text', { nullable: true })
  location: string | null;

  @Column({
    type: 'enum',
    enum: MachineStatus,
    default: MachineStatus.ACTIVE,
  })
  @IsEnum(MachineStatus)
  status: MachineStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.serialNumber = this.serialNumber.toLowerCase().trim();
    if (this.location === '') {
      this.location = null;
    }
    if (!Object.values(MachineStatus).includes(this.status)) {
      this.status = MachineStatus.ACTIVE; 
    }
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
