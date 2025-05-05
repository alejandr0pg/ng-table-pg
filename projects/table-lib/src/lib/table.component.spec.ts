import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TableComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
          }
        })
      ],
      providers: [TranslateStore]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add basic functionality tests
  it('should handle page changes', () => {
    component.itemsPerPage = 10;
    component.filteredData = Array(20).fill({});
    component.handlePageChange('next');
    expect(component.currentPage).toBe(2);
  });

  it('should handle drag and drop', () => {
    const mockItem = { id: 1 };
    component.filteredData = [mockItem, { id: 2 }];
    component.onDragStart({ preventDefault: () => {} } as DragEvent, mockItem);
    expect(component.isDragging).toBe(true);
    expect(component.draggedItem).toBe(mockItem);
  });
});
