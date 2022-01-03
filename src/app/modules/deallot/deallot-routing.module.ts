import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeallotComponent } from './deallot.component';

const routes: Routes = [{ path: '', component: DeallotComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeallotRoutingModule { }
