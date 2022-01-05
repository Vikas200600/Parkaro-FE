import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotParkingComponent } from './allot-parking.component';

describe('AllotParkingComponent', () => {
  let component: AllotParkingComponent;
  let fixture: ComponentFixture<AllotParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllotParkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllotParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
