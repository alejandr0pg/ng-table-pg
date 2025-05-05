import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TableRowContentComponent } from './components/content/table-row-content.component';
import { PipesModule } from './pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkeletonTableComponent } from './components/skeleton/skeleton-table.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { DropdownButtonComponent } from './components/button-dropdown/button-dropdown.component';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import {
  ITableColumns,
  ITableActions,
  ITableButtons,
  ITableOrderChange,
} from './table.interfaces';

@Component({
  selector: 'ng-table-pg',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    SkeletonTableComponent,
    DropdownButtonComponent,
    TableRowContentComponent,
    TranslateModule,
    DragDropModule,
  ],
  templateUrl: './table.template.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: any[] | null = [];
  @Input() columns: ITableColumns[] = [];
  @Input() filterOptions: { key: string; label: string; options: any[] }[] = [];
  @Input() actions: ITableActions[] = [];
  @Input() buttons: ITableButtons[] = [];
  @Input() loading = false;
  @Input() showSearch = true;
  @Input() enableExport = true;
  @Input() itemsPerPage = 10;
  @Input() showActionRow: (item: any) => boolean = (item: any) => true;
  @Input() enableDragDrop = false;
  @Output() orderChanged = new EventEmitter<ITableOrderChange>();

  filteredData: any[] = [];
  paginatedData: any[] = [];
  searchTerm = '';
  activeFilters: { [key: string]: any } = {};
  showFilters = false;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  activeDropdownIndex: number | null = null;

  isDragging = false;
  dragTimeout: any;
  draggedItem: any;
  dragOverPage: number | null = null;
  pageDropLists: string[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.filteredData = [...(this.data || [])];
    this.updatePagination();
    this.updatePageDropLists();
  }

  updatePageDropLists() {
    this.pageDropLists = Array.from(
      { length: this.getTotalPages() },
      (_, i) => `page-${i + 1}`
    );
  }

  dragScrollInterval: any;
  readonly HOVER_DELAY = 800; // tiempo en ms antes de cambiar de página

  @HostListener('cdkDragStarted')
  onDragStarted() {
    this.isDragging = true;
  }

  @HostListener('cdkDragEnded')
  onDragEnded() {
    this.isDragging = false;
    this.dragOverPage = null;
    if (this.dragScrollInterval) {
      clearInterval(this.dragScrollInterval);
    }
  }

  handleDragEnter(page: number) {
    if (!this.enableDragDrop || !this.isDragging) return;

    this.dragOverPage = page;

    if (this.currentPage !== page) {
      if (this.dragScrollInterval) {
        clearInterval(this.dragScrollInterval);
      }

      this.dragScrollInterval = setTimeout(() => {
        this.goToPage(page);
      }, this.HOVER_DELAY);
    }
  }

  handleDragLeave(page: number) {
    if (this.dragOverPage === page) {
      this.dragOverPage = null;
      if (this.dragScrollInterval) {
        clearInterval(this.dragScrollInterval);
      }
    }
  }

  handlePageDrop(event: CdkDragDrop<any[]>, targetPage: number) {
    if (this.dragScrollInterval) {
      clearInterval(this.dragScrollInterval);
    }

    const item = event.item.data;
    const currentIndex = this.filteredData.indexOf(item);
    const targetIndex = (targetPage - 1) * this.itemsPerPage;

    moveItemInArray(this.filteredData, currentIndex, targetIndex);

    this.orderChanged.emit({
      item,
      oldIndex: currentIndex,
      newIndex: targetIndex,
      oldPage: Math.floor(currentIndex / this.itemsPerPage) + 1,
      newPage: targetPage,
      globalIndex: targetIndex,
    });

    this.dragOverPage = null;
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['columns'] || changes['filterOptions']) {
      this.filteredData = [...(this.data || [])];
      this.applyFilters();
    }
  }

  validActions = (item: any) => {
    // Si showActionRow es false, no mostramos ninguna acción
    if (!this.showActionRow(item)) {
      return false;
    }

    // Verificamos si hay al menos una acción que se pueda mostrar
    return this.actions.some((action) => {
      // Si la acción no tiene show, se muestra por defecto
      // Si tiene show, validamos su condición
      return !action.show ? true : action.show(item);
    });
  };

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  toggleDropdown(index: number) {
    if (this.activeDropdownIndex === index) {
      this.activeDropdownIndex = null;
    } else {
      this.activeDropdownIndex = index;
    }
  }

  closeAllDropdowns() {
    this.activeDropdownIndex = null;
  }

  applyFilters() {
    const searchInObject = (obj: any): boolean => {
      if (typeof obj === 'object' && obj !== null) {
        return Object.values(obj).some((value) => searchInObject(value));
      }
      return String(obj).toLowerCase().includes(this.searchTerm.toLowerCase());
    };

    this.filteredData =
      this.data?.filter((item) => {
        const matchesSearch = searchInObject(item);
        const matchesFilters = Object.entries(this.activeFilters).every(
          ([key, value]) => {
            if (value === 'false' || value === 'true') {
              value = value === 'true';
            }
            return item[key] === value || value === '';
          }
        );
        return matchesSearch && matchesFilters;
      }) || [];
    this.currentPage = 1;
    this.updatePagination();
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'desc';
    }

    this.filteredData.sort((a, b) => {
      if (a[column] < b[column]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  shouldShowPageButton(page: number): boolean {
    const totalPages = this.getTotalPages();
    if (totalPages <= 7) return true;
    if (page === 1 || page === totalPages) return true;
    if (page >= this.currentPage - 1 && page <= this.currentPage + 1)
      return true;
    return false;
  }

  shouldShowEllipsis(page: number): boolean {
    const totalPages = this.getTotalPages();
    if (totalPages <= 7) return false;
    if (page === 2 && this.currentPage > 4) return true;
    if (page === totalPages - 1 && this.currentPage < totalPages - 3)
      return true;
    return false;
  }

  async exportData(type: 'csv' | 'excel') {
    try {
      // Preparar los datos para exportar con traducciones
      const dataToExport = await Promise.all(
        this.filteredData.map(async (item) => {
          const row: any = {};

          for (const column of this.columns) {
            // Obtener el valor base
            let value = item[column.key];

            // Aplicar transformación si existe
            if (column.transform) {
              value = column.transform(value, item);
            }

            // Aplicar formato según el tipo de columna
            switch (column.type) {
              case 'date':
                value = value ? new Date(value).toLocaleDateString() : '';
                break;
              case 'date-time':
                value = value ? new Date(value).toLocaleString() : '';
                break;
              case 'currency':
                value = typeof value === 'number' ? value.toFixed(2) : value;
                break;
              case 'boolean':
                value = await this.translate
                  .get(value ? 'YES' : 'NO')
                  .toPromise();
                break;
              case 'status':
                value = await this.getTranslatedStatus(value);
                break;
              case 'state':
                value = await this.translate
                  .get(value?.toUpperCase() || '')
                  .toPromise();
                break;
            }

            // Obtener la traducción del header
            const header = await this.translate.get(column.label).toPromise();
            row[header] = value;
          }
          return row;
        })
      );

      if (type === 'csv') {
        this.exportToCsv(dataToExport);
      } else {
        this.exportToExcel(dataToExport);
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  }

  private async getTranslatedStatus(status: any): Promise<string> {
    const statusMap: { [key: string]: string } = {
      true: 'ACTIVE',
      false: 'INACTIVE',
      partial: 'PARTIAL',
      reject: 'REJECTED',
      pending: 'PENDING',
      completed: 'COMPLETED',
      'in-progress': 'IN_PROGRESS',
    };

    const statusKey =
      typeof status === 'boolean' ? String(status) : status?.toLowerCase();

    const translationKey =
      statusMap[statusKey] || statusKey?.toUpperCase() || '';
    return await this.translate.get(`STATUS.${translationKey}`).toPromise();
  }

  private exportToCsv(data: any[]) {
    if (data.length === 0) return;

    // Usar las claves del primer objeto como headers
    const headers = Object.keys(data[0]);

    // Convertir datos a formato CSV con manejo de caracteres especiales
    const csvContent = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((header) => {
            const cellValue = row[header] ?? '';
            // Escapar comas y comillas, envolver en comillas si es necesario
            return typeof cellValue === 'string' &&
              (cellValue.includes(',') || cellValue.includes('"'))
              ? `"${cellValue.replace(/"/g, '""')}"`
              : cellValue;
          })
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], {
      type: 'text/csv;charset=utf-8-sig',
    });
    saveAs(blob, `export_${new Date().toISOString()}.csv`);
  }

  private exportToExcel(data: any[]) {
    if (data.length === 0) return;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data, {
      dateNF: 'yyyy-mm-dd',
      cellDates: true,
    });

    // Ajustar ancho de columnas
    const colWidths = Object.keys(data[0]).map((header) => ({
      wch: Math.max(
        header.length,
        ...data.map((row) => String(row[header] || '').length)
      ),
    }));
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
      cellDates: true,
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `export_${new Date().toISOString()}.xlsx`);
  }

  onDragStart(event: DragEvent, item: any) {
    this.isDragging = true;
    this.draggedItem = item;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (!this.isDragging) return;

    const tableRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    const sensitivity = 50; // pixels from edge

    // Detectar si estamos cerca de los bordes
    if (event.clientX - tableRect.left < sensitivity) {
      // Cerca del borde izquierdo, ir a página anterior
      this.handlePageChange('prev');
    } else if (tableRect.right - event.clientX < sensitivity) {
      // Cerca del borde derecho, ir a página siguiente
      this.handlePageChange('next');
    }
  }

  handlePageChange(direction: 'prev' | 'next') {
    if (this.dragTimeout) return;

    this.dragTimeout = setTimeout(() => {
      if (direction === 'prev' && this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      } else if (
        direction === 'next' &&
        this.currentPage < this.getTotalPages()
      ) {
        this.goToPage(this.currentPage + 1);
      }
      this.dragTimeout = null;
    }, 500); // Delay para evitar cambios rápidos de página
  }

  onDrop(event: DragEvent, targetItem: any) {
    event.preventDefault();
    this.isDragging = false;
    if (this.dragTimeout) {
      clearTimeout(this.dragTimeout);
      this.dragTimeout = null;
    }

    if (!this.draggedItem || !targetItem) return;

    const sourceIndex = this.filteredData.indexOf(this.draggedItem);
    const targetIndex = this.filteredData.indexOf(targetItem);

    if (sourceIndex === -1 || targetIndex === -1) return;

    // Mover el item en el array
    this.filteredData.splice(sourceIndex, 1);
    this.filteredData.splice(targetIndex, 0, this.draggedItem);

    // Emitir el evento de cambio
    this.orderChanged.emit({
      item: this.draggedItem,
      oldIndex: sourceIndex,
      newIndex: targetIndex,
      oldPage: Math.floor(sourceIndex / this.itemsPerPage) + 1,
      newPage: Math.floor(targetIndex / this.itemsPerPage) + 1,
      globalIndex: targetIndex,
    });

    this.updatePagination();
    this.draggedItem = null;
  }

  private scrollTimeout: any;
  private readonly SCROLL_THRESHOLD = 50; // pixels from edge
  private readonly SCROLL_INTERVAL = 500; // ms between page changes

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.handleTableMouseMove(event);
  }

  handleTableMouseMove(event: MouseEvent) {
    if (!this.enableDragDrop || !this.isDragging) return;

    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // Clear existing timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Near left edge
    if (event.clientX - rect.left < this.SCROLL_THRESHOLD && scrollLeft > 0) {
      this.scrollTimeout = setInterval(() => {
        container.scrollLeft -= 10;
      }, 16);
    }
    // Near right edge
    else if (
      rect.right - event.clientX < this.SCROLL_THRESHOLD &&
      scrollLeft < maxScroll
    ) {
      this.scrollTimeout = setInterval(() => {
        container.scrollLeft += 10;
      }, 16);
    }
    // Near top with previous page available
    else if (
      event.clientY - rect.top < this.SCROLL_THRESHOLD &&
      this.currentPage > 1
    ) {
      this.goToPage(this.currentPage - 1);
    }
    // Near bottom with next page available
    else if (
      rect.bottom - event.clientY < this.SCROLL_THRESHOLD &&
      this.currentPage < this.getTotalPages()
    ) {
      this.goToPage(this.currentPage + 1);
    } else {
      clearInterval(this.scrollTimeout);
    }
  }

  handleDrop(event: CdkDragDrop<any[]>) {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    const currentPageOffset = (this.currentPage - 1) * this.itemsPerPage;

    moveItemInArray(
      this.filteredData,
      previousIndex + currentPageOffset,
      currentIndex + currentPageOffset
    );

    this.orderChanged.emit({
      item: this.filteredData[currentIndex + currentPageOffset],
      oldIndex: previousIndex,
      newIndex: currentIndex,
      oldPage:
        Math.floor((previousIndex + currentPageOffset) / this.itemsPerPage) + 1,
      newPage:
        Math.floor((currentIndex + currentPageOffset) / this.itemsPerPage) + 1,
      globalIndex: currentIndex + currentPageOffset,
    });

    this.updatePagination();
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }
}
