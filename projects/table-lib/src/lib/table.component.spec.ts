import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLibComponent } from './table.component';

describe('TableLibComponent', () => {
  let component: TableLibComponent;
  let fixture: ComponentFixture<TableLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableLibComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
