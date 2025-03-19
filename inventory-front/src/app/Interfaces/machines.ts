export interface Machine {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  location?: string;
  status: MachineStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum MachineStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
}
