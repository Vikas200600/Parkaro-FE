import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class LotService {
  lotSubject$ = new BehaviorSubject<object>({});
  parkSubject$ = new BehaviorSubject<object>({});

  constructor(
    private http: HttpClient,
    private snackBarService: SnackbarService
  ) {}

  fetchUpdatedLots() {
    this.http.get('/api/lots').subscribe((lotData: object) => {
      this.lotSubject$.next(lotData['data']);
    });
  }

  fetchUpdatedParks() {
    this.http.get('/api/parks').subscribe((parkdata: object) => {
      this.parkSubject$.next(parkdata['data']);
    });
  }

  fetchAvailableLots(type: string) {
    return this.http.get(`/api/lots/${type}`);
  }

  allotParking(lotDetails: object) {
    this.http.post('/api/parks/allot', lotDetails).subscribe(() => {
      this.snackBarService.openSanckBar('Parking Alloted');
    });
  }

  addParking(parkingDetails: object) {
    this.http.post('/api/lots/add', parkingDetails).subscribe(() => {
      this.snackBarService.openSanckBar('Parking Added');
    });
  }

  fetchOccupiedLotData() {
    return this.http.get('/api/occupied/lots');
  }

  fetchOccupiedVehicleData() {
    return this.http.get('/api/occupied/vehicles');
  }

  deallot(lotId: string) {
    this.http.post('/api/parks/deallot/' + lotId, {}).subscribe(() => {
      this.snackBarService.openSanckBar('Parking Dealloted');
    });
  }
}
