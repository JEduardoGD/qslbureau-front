import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QslCapturaComponent } from './qsl-captura.component';

describe('QslCapturaComponent', () => {
  let component: QslCapturaComponent;
  let fixture: ComponentFixture<QslCapturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QslCapturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QslCapturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
