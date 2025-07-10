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

  // Pagination tests
  describe('Pagination', () => {
    beforeEach(() => {
      // Create test data
      component.data = Array(25).fill(null).map((_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
      component.filteredData = [...component.data];
    });

    it('should initialize with default itemsPerPage', () => {
      expect(component.itemsPerPage).toBe(10);
    });

    it('should update pagination when itemsPerPage changes', () => {
      component.itemsPerPage = 5;
      component.onItemsPerPageChange();
      
      expect(component.currentPage).toBe(1);
      expect(component.paginatedData.length).toBe(5);
    });

    it('should handle itemsPerPage as string and convert to number', () => {
      component.itemsPerPage = '5' as any;
      component.onItemsPerPageChange();
      
      expect(component.itemsPerPage).toBe(5);
      expect(component.paginatedData.length).toBe(5);
    });

    it('should maintain correct page size when changing pages', () => {
      component.itemsPerPage = 5;
      component.updatePagination();
      
      // Go to page 2
      component.goToPage(2);
      
      expect(component.currentPage).toBe(2);
      expect(component.paginatedData.length).toBe(5);
      expect(component.paginatedData[0].id).toBe(6); // First item of page 2
    });

    it('should calculate total pages correctly', () => {
      component.itemsPerPage = 10;
      expect(component.getTotalPages()).toBe(3); // 25 items / 10 = 3 pages
      
      component.itemsPerPage = 5;
      expect(component.getTotalPages()).toBe(5); // 25 items / 5 = 5 pages
    });

    it('should handle string itemsPerPage in getTotalPages', () => {
      component.itemsPerPage = '8' as any;
      expect(component.getTotalPages()).toBe(4); // 25 items / 8 = 3.125 -> 4 pages
    });

    it('should not go beyond last page', () => {
      component.itemsPerPage = 10;
      component.goToPage(10); // Try to go beyond available pages
      
      expect(component.currentPage).toBe(3); // Should stay at last page
    });

    it('should not go below first page', () => {
      component.currentPage = 1;
      component.goToPage(0); // Try to go below first page
      
      expect(component.currentPage).toBe(1); // Should stay at first page
    });

    it('should update pagination when changing itemsPerPage then changing page', () => {
      // Start with 10 items per page
      component.itemsPerPage = 10;
      component.updatePagination();
      expect(component.paginatedData.length).toBe(10);
      
      // Change to 5 items per page
      component.itemsPerPage = 5;
      component.onItemsPerPageChange();
      expect(component.paginatedData.length).toBe(5);
      
      // Go to page 2
      component.goToPage(2);
      expect(component.paginatedData.length).toBe(5);
      expect(component.paginatedData[0].id).toBe(6); // First item of page 2
    });
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
