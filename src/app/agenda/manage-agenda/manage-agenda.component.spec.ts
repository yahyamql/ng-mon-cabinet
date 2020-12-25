import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAgendaComponent } from './manage-agenda.component';

describe('ManageAgendaComponent', () => {
  let component: ManageAgendaComponent;
  let fixture: ComponentFixture<ManageAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
