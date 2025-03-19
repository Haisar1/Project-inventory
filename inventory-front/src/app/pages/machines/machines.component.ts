import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { machineService } from '../../Services/machine.service';
import { Machine } from './../../Interfaces/machines';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule, ReactiveFormsModule, FormsModule, CommonModule]
})
export class MachinesComponent implements OnInit {

  form: FormGroup;
  private machineService = inject(machineService);
  machineList: Machine[] = [];
  filteredMachines: Machine[] = [];
  selectedMachine: Machine | null = null;
  showErrorPopup: boolean = false;
  errorMessage: string = '';
  showEditPopup: boolean = false;
  showAddForm: boolean = false;
  isLoading: boolean = true;
  searchTerm: string = '';
  searchCriteria: string = 'name';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      location: [''],
      status: ['active']
    });
  }

  ngOnInit(): void {
    this.getMachines();
  }

  displayErrorPopup(message: string) {
    this.errorMessage = message;
    this.showErrorPopup = true;
  }

  closeErrorPopup() {
    this.showErrorPopup = false;
  }

  getMachines() {
    this.machineService.getMachines().subscribe({
      next: (data) => {
        this.isLoading = false;
        if (Array.isArray(data) && data.length > 0) {
          this.machineList = data;
          this.filteredMachines = data;
        }
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage = err?.error?.message || 'Error al cargar las máquinas';
        this.displayErrorPopup(errorMessage);
      }
    });
  }

  addMachine() {
    const request: Machine = this.form.value;

    this.machineService.add(request).subscribe({
      next: (data) => {
        this.machineList.push(data);
        this.filteredMachines = this.machineList;
        this.form.reset();
        this.showAddForm = false;
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Error al agregar la máquina';
        this.displayErrorPopup(errorMessage);
        this.closePopup();
      }
    });
  }

  deleteMachine(machine: Machine) {
    this.machineService.delete(machine.id).subscribe({
      next: () => {
        this.machineList = this.machineList.filter(x => x.id !== machine.id);
        this.filteredMachines = this.machineList;
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Error al eliminar la máquina';
        this.displayErrorPopup(errorMessage);
        this.closePopup();
      }
    });
  }

  selectMachine(machine: Machine) {
    this.selectedMachine = machine;
    this.form.reset();
    this.form.patchValue(machine);
    this.showEditPopup = true;
  }

  updateMachine() {
    if (!this.selectedMachine) return;
    const updatedFields = this.form.value;

    this.machineService.patch(this.selectedMachine.id, updatedFields).subscribe({
      next: (data) => {
        const index = this.machineList.findIndex(m => m.id === data.id);
        if (index !== -1) {
          this.machineList[index] = { ...this.machineList[index], ...data };
        }
        this.filteredMachines = this.machineList;
        this.form.reset();
        this.selectedMachine = null;
        this.showEditPopup = false;
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Error al actualizar la máquina';
        this.displayErrorPopup(errorMessage);
        this.closePopup();
      }
    });
  }

  closePopup() {
    this.showEditPopup = false;
    this.showAddForm = false;
    this.form.reset();
  }

  filterMachines() {
    if (!this.searchTerm) {
      this.filteredMachines = this.machineList;
    } else {
      this.filteredMachines = this.machineList.filter(machine =>
        machine[this.searchCriteria]?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
