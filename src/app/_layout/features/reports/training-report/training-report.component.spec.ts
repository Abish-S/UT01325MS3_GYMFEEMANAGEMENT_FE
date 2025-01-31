import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingReportComponent } from './training-report.component';

describe('TrainingReportComponent', () => {
  let component: TrainingReportComponent;
  let fixture: ComponentFixture<TrainingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
