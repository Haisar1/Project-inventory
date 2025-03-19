export interface Machine {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  location?: string;
  status?: MachineStatus;
  [key: string]: any;
  createdAt: Date;
  updatedAt: Date;
}

export enum MachineStatus {
  ACTIVE = 'Activo',
  INACTIVE = 'Inactivo',
  MAINTENANCE = 'mantenimiento ',
}
