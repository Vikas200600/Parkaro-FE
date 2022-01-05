import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, _closeDialogVia } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-deallot-parking',
  templateUrl: './deallot-parking.component.html',
  styleUrls: ['./deallot-parking.component.scss'],
})
export class DeallotParkingComponent implements OnInit {
  constructor(
    private lotService: LotService,
    private dialogRef: MatDialogRef<DeallotParkingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object
  ) {}

  ngOnInit(): void {}

  submitDeallotment(): void {
    this.lotService.deallot(this.data['id']);
    this.lotService.fetchUpdatedLots();
  }
}
