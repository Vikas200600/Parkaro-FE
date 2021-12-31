import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-allot',
  templateUrl: './allot.component.html',
  styleUrls: ['./allot.component.scss'],
})
export class AllotComponent implements OnInit {
  allotForm: FormGroup;

  typeData: string[] = ['2W', '4W'];
  availableLots: string[] = [];

  constructor(private fb: FormBuilder, private lotService: LotService) {
    this.allotForm = this.fb.group({
      regNo: ['', Validators.required],
      type: ['', Validators.required],
      lotName: ['', Validators.required],
      duration: [''],
    });
  }

  ngOnInit(): void {}

  getAvailableLots() {
    this.lotService
      .fetchAvailableLots(this.allotForm.value.type)
      .subscribe((data: string[]) => (this.availableLots = data));
  }

  submitAllotment() {
    this.lotService.allotParking(this.allotForm.value);
  }
}
