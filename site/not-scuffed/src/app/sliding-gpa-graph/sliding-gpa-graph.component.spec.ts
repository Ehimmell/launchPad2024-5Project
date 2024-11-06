import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingGpaGraphComponent } from './sliding-gpa-graph.component';

describe('SlidingGpaGraphComponent', () => {
  let component: SlidingGpaGraphComponent;
  let fixture: ComponentFixture<SlidingGpaGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlidingGpaGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidingGpaGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
