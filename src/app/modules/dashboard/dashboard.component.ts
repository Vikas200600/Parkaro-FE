import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AddParkingComponent } from 'src/app/components/dialogs/add-parking/add-parking.component';
import { AllotParkingComponent } from 'src/app/components/dialogs/allot-parking/allot-parking.component';
import { DeallotParkingComponent } from 'src/app/components/dialogs/deallot-parking/deallot-parking.component';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  today: Date = new Date();
  time: string = new Date().toTimeString().split(' ')[0];
  bgColors: object = {
    occupiedColor: '#68a6c2',
    availableColor: '#57ad68',
    availableSoonColor: '#ff7802',
    overParkedColor: '#ac191b',
  };

  occupied: number = 0;
  available: number = 0;
  availableSoon: number = 0;
  overParked: number = 0;

  lotData: object;

  constructor(private lotService: LotService, public dialog: MatDialog) {}

  setLotData() {
    this.lotService.lotSubject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((lotData) => {
        this.lotData = lotData;
        if (this.lotData['keys'] && this.lotData['keys'].length) {
          this.occupied = 0;
          this.available = 0;
          this.availableSoon = 0;
          this.overParked = 0;
          this.lotData['keys'].forEach((key) => {
            this.lotData[key].available
              ? this.available++
              : this.lotData[key].availableTime
              ? this.lotData[key].availableTime - this.getNow() <= 900000 &&
                this.lotData[key].availableTime - this.getNow() > 0
                ? this.availableSoon++
                : lotData[key].availableTime - this.getNow() < 0
                ? this.overParked++
                : this.occupied++
              : this.occupied++;
          });
        }
      });
  }

  getNow(): number {
    return Date.now();
  }

  openDialog(caseString: string, lotDeatails?: object) {
    switch (caseString) {
      case 'add':
        this.dialog.open(AddParkingComponent);
        break;
      case 'allot':
        this.dialog.open(AllotParkingComponent, {
          data: { lotName: lotDeatails['lotName'], type: lotDeatails['type'] },
        });
        break;
      case 'deallot':
        this.dialog.open(DeallotParkingComponent, {
          data: { id: lotDeatails['parkingId'] },
        });
        break;
    }
  }

  filterSelected(action: string) {
    const disabledColor = '#edf5e1';
    this.resetColors();
    for (let key in this.bgColors) {
      if (key !== action) {
        this.bgColors[key] = disabledColor;
      }
    }
  }

  resetColors() {
    this.bgColors = {
      occupiedColor: '#68a6c2',
      availableColor: '#57ad68',
      availableSoonColor: '#ff7802',
      overParkedColor: '#ac191b',
    };
  }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date().toTimeString().split(' ')[0];
    }, 1000);
    this.lotService.fetchUpdatedLots();
    this.setLotData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
