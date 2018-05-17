import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheerImageComponent } from './cheer-image.component';

describe('CheerImageComponent', () => {
  let component: CheerImageComponent;
  let fixture: ComponentFixture<CheerImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheerImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
