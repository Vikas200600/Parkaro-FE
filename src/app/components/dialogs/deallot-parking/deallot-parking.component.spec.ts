import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeallotParkingComponent } from './deallot-parking.component';

describe('DeallotParkingComponent', () => {
  let component: DeallotParkingComponent;
  let fixture: ComponentFixture<DeallotParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeallotParkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeallotParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
