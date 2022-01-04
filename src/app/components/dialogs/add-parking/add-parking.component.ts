import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-add-parking',
  templateUrl: './add-parking.component.html',
  styleUrls: ['./add-parking.component.scss'],
})
export class AddParkingComponent implements OnInit {
  addForm: FormGroup;
  typeData: string[] = ['2W', '4W'];

  constructor(
    private dialogRef: MatDialogRef<AddParkingComponent>,
    private fb: FormBuilder,
    private lotService: LotService
  ) {
    this.addForm = this.fb.group({
      lotName: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit() {}

  submitParking(): void {
    this.lotService.addParking(this.addForm.value);
    this.lotService.fetchUpdatedLots();
  }
}
