import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-allot-parking',
  templateUrl: './allot-parking.component.html',
  styleUrls: ['./allot-parking.component.scss'],
})
export class AllotParkingComponent implements OnInit {
  allotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private lotService: LotService,
    private dialogRef: MatDialogRef<AllotParkingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object
  ) {
    this.allotForm = this.fb.group({
      regNo: ['', Validators.required],
      duration: [''],
    });
  }

  ngOnInit() {}

  submitAllotment(): void {
    this.lotService.allotParking({ ...this.allotForm.value, ...this.data });
    this.lotService.fetchUpdatedLots();
  }
}
