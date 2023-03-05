import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomemtFormComponent } from './momemt-form.component';

describe('MomemtFormComponent', () => {
  let component: MomemtFormComponent;
  let fixture: ComponentFixture<MomemtFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomemtFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MomemtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
