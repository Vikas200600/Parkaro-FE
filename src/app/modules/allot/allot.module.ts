import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { AllotRoutingModule } from './allot-routing.module';
import { AllotComponent } from './allot.component';

@NgModule({
  declarations: [AllotComponent],
  imports: [
    CommonModule,
    AllotRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AllotModule {}
