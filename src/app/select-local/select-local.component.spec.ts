import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLocalComponent } from './select-local.component';

describe('SelectLocalComponent', () => {
  let component: SelectLocalComponent;
  let fixture: ComponentFixture<SelectLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
