import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
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

  // dataSource = [
  //   {
  //     id: 1,
  //     regNo: 'KA53L7221',
  //     type: '2W',
  //     lotName: 'A1',
  //     parkingInStamp: '1640760936494',
  //     parkingOutStamp: '1640761527960',
  //     price: 20,
  //   },
  //   {
  //     id: 2,
  //     regNo: 'KA53L7221',
  //     type: '2W',
  //     lotName: 'A1',
  //     parkingInStamp: '1640760936494',
  //     parkingOutStamp: '1640761527960',
  //     price: 20,
  //   },
  //   {
  //     id: 3,
  //     regNo: 'KA53L7221',
  //     type: '2W',
  //     lotName: 'A1',
  //     parkingInStamp: '1640760936494',
  //     parkingOutStamp: '1640761527960',
  //     price: 20,
  //   },
  //   {
  //     id: 4,
  //     regNo: 'KA53L7221',
  //     type: '2W',
  //     lotName: 'A1',
  //     parkingInStamp: '1640760936494',
  //     parkingOutStamp: '1640761527960',
  //     price: 20,
  //   },
  // ];

  constructor(private lotService: LotService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.lotService.fetchUpdatedParks();
    this.setParkData();
  }

  setParkData() {
    this.lotService.parkSubject$.subscribe((data) => {
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
}

// this.parkData['keys'].forEach((key) => {
//   _temp.push(this.parkData[key]);
// });
// this.dataSource = JSON.parse(JSON.stringify(_temp));
