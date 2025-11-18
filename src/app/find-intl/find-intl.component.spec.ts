import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindIntlComponent } from './find-intl.component';

describe('FindIntlComponent', () => {
  let component: FindIntlComponent;
  let fixture: ComponentFixture<FindIntlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindIntlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindIntlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
