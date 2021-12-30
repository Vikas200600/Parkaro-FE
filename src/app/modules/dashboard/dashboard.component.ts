import { Component, OnInit } from '@angular/core';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  today: Date = new Date();
  time: string = new Date().toTimeString().split(' ')[0];

  occupied: number = 0;
  available: number = 0;
  availableSoon: number = 0;
  overParked: number = 0;

  lotData: object;

  constructor(private lotService: LotService) {
    setInterval(() => {
      this.time = new Date().toTimeString().split(' ')[0];
    }, 1000);

    // this.lotService.fetchUpdatedLots();
    this.setLotData();
  }

  setLotData() {
    this.lotService.lotSubject$.subscribe((lotData) => {
      this.lotData = lotData;
    });
  }

  setStats() {
    if (this.lotData['keys'] && this.lotData['keys'].length) {
      this.lotData['keys'].forEach((key) => {
        this.lotData[key].available
          ? this.available++
          : this.lotData[key].availableTime
          ? this.lotData[key].availableTime - this.getNow() <= 900000 &&
            this.lotData[key].availableTime - this.getNow() > 900000
            ? this.availableSoon++
            : this.overParked++
          : this.occupied++;
      });
    }
  }

  getNow(): number {
    return Date.now();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.setStats();
    }, 0);
  }
}
