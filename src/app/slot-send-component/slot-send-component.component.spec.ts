import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotSendComponentComponent } from './slot-send-component.component';

describe('SlotSendComponentComponent', () => {
  let component: SlotSendComponentComponent;
  let fixture: ComponentFixture<SlotSendComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotSendComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotSendComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
