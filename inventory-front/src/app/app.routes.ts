import { Routes } from '@angular/router';

import { MachinesComponent } from './pages/machines/machines.component';

export const routes: Routes = [
     {path:"", component:MachinesComponent},
     {path:"machines", component:MachinesComponent},
];
