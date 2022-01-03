import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeallotComponent } from './deallot.component';

describe('DeallotComponent', () => {
  let component: DeallotComponent;
  let fixture: ComponentFixture<DeallotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeallotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
