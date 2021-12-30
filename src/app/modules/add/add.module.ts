import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    AddRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AddModule {}
