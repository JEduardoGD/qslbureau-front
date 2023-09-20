import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidateSlotsComponent } from './consolidate-slots.component';

describe('ConsolidateSlotsComponent', () => {
  let component: ConsolidateSlotsComponent;
  let fixture: ComponentFixture<ConsolidateSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidateSlotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidateSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
