import { Machine } from './../../Interfaces/machines';
import { Component, OnInit, inject } from '@angular/core';
import { machineService } from '../../Services/machine.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: '',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class MachinesComponent implements OnInit {

  form: FormGroup;
  private machineService = inject(machineService);
  machineList: Machine[] = [];
  selectedMachine: Machine | null = null;
  showErrorPopup: boolean = false;
  showEditPopup: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({

    });
  }

  ngOnInit(): void {
    this.getMachines();
  }

  displayErrorPopup() {
    this.showErrorPopup = true;
  }

  closeErrorPopup() {
    this.showErrorPopup = false;
  }

  getMachines() {
    this.machineService.getMachines().subscribe({
      next: (data) => {
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          this.machineList = data;
        }
      },
      error: (error) => {
        this.displayErrorPopup();
      }
    });
  }

  addMachine() {
    const request: Machine = this.form.value;
    request.id = '0';

    this.machineService.add(request).subscribe({
      next: (data) => {
        this.machineList.push(data);
        this.form.reset();
      },
      error: (error) => {
        this.displayErrorPopup();
      }
    });
  }

  deleteMachine(machine: Machine) {
    this.machineService.delete(Number(machine.id)).subscribe({
      next: () => {
        this.machineList = this.machineList.filter(x => x.id !== machine.id);
      },
      error: (error) => { console.error(error); }
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
    const request: Machine = { ...this.selectedMachine, ...this.form.value };

    this.machineService.update(Number(this.selectedMachine.id), request).subscribe({
      next: (data) => {
        const index = this.machineList.findIndex(m => m.id === data.id);
        if (index !== -1) {
          this.machineList[index] = data;
        }
        this.form.reset();
        this.selectedMachine = null;
        this.showEditPopup = false;
      },
      error: (error) => { this.displayErrorPopup(); }
    });
  }

  closePopup() {
    this.showEditPopup = false;
    this.form.reset();
  }
}
