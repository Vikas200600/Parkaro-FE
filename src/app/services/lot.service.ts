import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LotService {
  lotSubject$ = new BehaviorSubject<object>({});

  constructor(private http: HttpClient) {
    // this.fetchUpdatedLots();
  }

  fetchUpdatedLots() {
    this.http.get('/api/lots').subscribe((lotData: object) => {
      this.lotSubject$.next(lotData['data']);
    });
  }
}
