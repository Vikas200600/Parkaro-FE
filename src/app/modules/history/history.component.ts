import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    'parkingInDate',
    'parkingOutDate',
    'regNo',
    'type',
    'lotName',
    'parkingInStamp',
    'parkingOutStamp',
    'price',
  ];
  range: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private lotService: LotService, private fb: FormBuilder) {
    this.range = fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

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

  applyDateFilter() {
    if (this.range.valid) {
      this.setParkData();
      this.dataSource.data = this.dataSource.data.filter((data) => {
        return (
          data['parkingInStamp'] >= Date.parse(this.range.value.startDate) &&
          data['parkingInStamp'] <= Date.parse(this.range.value.endDate)
        );
      });
    }
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
