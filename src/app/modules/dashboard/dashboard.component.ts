import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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

  occupied: number = 0;
  available: number = 0;
  availableSoon: number = 0;
  overParked: number = 0;

  lotData: object;

  constructor(private lotService: LotService) {}

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
