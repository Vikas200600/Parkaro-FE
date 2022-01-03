import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  parkData: object;
  dataSource: object[] = [];
  headers: string[] = [
    'id',
    'parkingDate',
    'regNo',
    'type',
    'lotName',
    'parkingInStamp',
    'parkingOutStamp',
    'price',
  ];

  constructor(private lotService: LotService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.lotService.fetchUpdatedParks();
    this.setParkData();
  }

  setParkData() {
    this.lotService.parkSubject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.parkData = data;
        console.log(this.parkData);
        if (this.parkData['keys'] && this.parkData['keys'].length) {
          const _tempSource = [];
          this.parkData['keys'].forEach((key) => {
            _tempSource.push(this.parkData[key]);
          });
          this.dataSource = _tempSource;
        }
      });
  }

  getTimeString(timeStamp: number) {
    return new Date(timeStamp).toLocaleTimeString();
  }

  getDateString(timeStamp: number) {
    return new Date(timeStamp).toLocaleDateString('en-GB');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
