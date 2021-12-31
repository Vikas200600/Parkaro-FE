import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  addForm: FormGroup;

  typeData: string[] = ['2W', '4W'];

  constructor(private fb: FormBuilder, private lotService: LotService) {
    this.addForm = this.fb.group({
      lotName: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submitParking() {
    this.lotService.addParking(this.addForm.value);
  }
}
