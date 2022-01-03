import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DeallotRoutingModule } from './deallot-routing.module';
import { DeallotComponent } from './deallot.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [DeallotComponent],
  imports: [
    CommonModule,
    DeallotRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class DeallotModule {}
