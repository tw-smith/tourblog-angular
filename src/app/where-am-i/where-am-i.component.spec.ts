import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereAmIComponent } from './where-am-i.component';

describe('WhereAmIComponent', () => {
  let component: WhereAmIComponent;
  let fixture: ComponentFixture<WhereAmIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhereAmIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhereAmIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
