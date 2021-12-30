import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-allot',
  templateUrl: './allot.component.html',
  styleUrls: ['./allot.component.scss'],
})
export class AllotComponent implements OnInit {
  allotForm: FormGroup;

  typeData: string[] = ['2W', '4W'];
  availableLots: string[] = ['a', 'b'];

  constructor(private fb: FormBuilder) {
    this.allotForm = this.fb.group({
      regNo: ['', Validators.required],
      type: ['', Validators.required],
      lotName: ['', Validators.required],
      duration: [''],
    });
  }

  ngOnInit(): void {}
}
