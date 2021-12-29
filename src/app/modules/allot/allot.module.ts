import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllotRoutingModule } from './allot-routing.module';
import { AllotComponent } from './allot.component';


@NgModule({
  declarations: [
    AllotComponent
  ],
  imports: [
    CommonModule,
    AllotRoutingModule
  ]
})
export class AllotModule { }
