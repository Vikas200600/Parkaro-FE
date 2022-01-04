import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource: MatTableDataSource<object>;
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private lotService: LotService,
    private cdr: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.lotService.fetchUpdatedParks();
    this.setParkData();
  }
  setParkData() {
    this.lotService.parkSubject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.parkData = data;
        if (this.parkData['keys'] && this.parkData['keys'].length) {
          const _tempSource = [];
          this.parkData['keys'].forEach((key) => {
            _tempSource.push(this.parkData[key]);
          });
          this.dataSource = new MatTableDataSource(_tempSource);
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  sortData(sort: Sort) {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
