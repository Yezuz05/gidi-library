import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadersListComponent } from './readers-list.component';

describe('ReadersListComponent', () => {
  let component: ReadersListComponent;
  let fixture: ComponentFixture<ReadersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
