import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllotComponent } from './allot.component';

const routes: Routes = [{ path: '', component: AllotComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllotRoutingModule { }
