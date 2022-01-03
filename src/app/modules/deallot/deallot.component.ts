import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-deallot',
  templateUrl: './deallot.component.html',
  styleUrls: ['./deallot.component.scss'],
})
export class DeallotComponent implements OnInit {
  deallotForm: FormGroup;
  modeData: string[] = ['By Lot Name', 'By Reg No'];
  toggleDisableControl: boolean = true;
  selectData: string[] = [];

  constructor(private fb: FormBuilder, private lotService: LotService) {
    this.deallotForm = fb.group({
      mode: ['', Validators.required],
      selected: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  getParkedDetails() {
    this.toggleDisableControl = false;
    if (this.deallotForm.get('mode').value === 'By Lot Name') {
      this.lotService
        .fetchOccupiedLotData()
        .subscribe((occupiedLotList: string[]) => {
          this.selectData = occupiedLotList;
          console.log(this.selectData);
        });
    } else {
      this.lotService
        .fetchOccupiedVehicleData()
        .subscribe((occupiedVehicleList: string[]) => {
          this.selectData = occupiedVehicleList;
        });
    }
  }

  submitDeallotment() {
    console.log(this.deallotForm.value);
    this.lotService.deallot(this.deallotForm.get('selected').value);
  }
}
