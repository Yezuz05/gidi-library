import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReaderComponent } from './view-reader.component';

describe('ViewReaderComponent', () => {
  let component: ViewReaderComponent;
  let fixture: ComponentFixture<ViewReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
