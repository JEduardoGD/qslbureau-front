import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupadoresComponent } from './agrupadores.component';

describe('AgrupadoresComponent', () => {
  let component: AgrupadoresComponent;
  let fixture: ComponentFixture<AgrupadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgrupadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrupadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
