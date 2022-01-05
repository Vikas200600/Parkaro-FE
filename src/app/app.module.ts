import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddParkingComponent } from './components/dialogs/add-parking/add-parking.component';
import { AllotParkingComponent } from './components/dialogs/allot-parking/allot-parking.component';
import { DeallotParkingComponent } from './components/dialogs/deallot-parking/deallot-parking.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddParkingComponent,
    AllotParkingComponent,
    DeallotParkingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
