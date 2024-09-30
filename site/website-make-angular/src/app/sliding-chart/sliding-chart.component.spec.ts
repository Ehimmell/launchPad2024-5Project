import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingChartComponent } from './sliding-chart.component';

describe('SlidingChartComponent', () => {
  let component: SlidingChartComponent;
  let fixture: ComponentFixture<SlidingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlidingChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
