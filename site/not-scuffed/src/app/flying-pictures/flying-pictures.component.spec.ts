import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyingPicturesComponent } from './flying-pictures.component';

describe('FlyingPicturesComponent', () => {
  let component: FlyingPicturesComponent;
  let fixture: ComponentFixture<FlyingPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyingPicturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlyingPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
