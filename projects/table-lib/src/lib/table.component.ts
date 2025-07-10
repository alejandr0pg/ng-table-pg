import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { TableRowContentComponent } from './components/content/table-row-content.component';
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
import { Web3UtilsPipe } from './pipes/web3-utils.pipe';
@Component({
  selector: 'ng-table-pg',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DragDropModule,
    TableRowContentComponent,
    DropdownButtonComponent,
    SkeletonTableComponent,
  ],
  templateUrl: './table.template.html',
  styleUrls: ['./table.styles.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [Web3UtilsPipe],
  styles: [
    `
      /* Estilos críticos con !important para asegurar que funcionen en cualquier proyecto */
      ng-table-pg .space-y-4 > * + * {
        margin-top: 1rem !important;
      }
      ng-table-pg .space-y-6 > * + * {
        margin-top: 1.5rem !important;
      }
      ng-table-pg .space-x-2 > * + * {
        margin-left: 0.5rem !important;
      }
      ng-table-pg .flex {
        display: flex !important;
      }
      ng-table-pg .justify-between {
        justify-content: space-between !important;
      }
      ng-table-pg .items-center {
        align-items: center !important;
      }
      ng-table-pg .relative {
        position: relative !important;
      }
      ng-table-pg .absolute {
        position: absolute !important;
      }
      ng-table-pg .flex-grow {
        flex-grow: 1 !important;
      }
      ng-table-pg .gap-2 {
        gap: 0.5rem !important;
      }
      ng-table-pg .mr-4 {
        margin-right: 1rem !important;
      }
      ng-table-pg .ml-1 {
        margin-left: 0.25rem !important;
      }
      ng-table-pg .ml-2 {
        margin-left: 0.5rem !important;
      }
      ng-table-pg .mb-1 {
        margin-bottom: 0.25rem !important;
      }
      ng-table-pg .mb-4 {
        margin-bottom: 1rem !important;
      }
      ng-table-pg .pl-3 {
        padding-left: 0.75rem !important;
      }
      ng-table-pg .pl-8 {
        padding-left: 2rem !important;
      }
      ng-table-pg .pr-4 {
        padding-right: 1rem !important;
      }
      ng-table-pg .pr-10 {
        padding-right: 2.5rem !important;
      }
      ng-table-pg .px-4 {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
      }
      ng-table-pg .px-6 {
        padding-left: 1.5rem !important;
        padding-right: 1.5rem !important;
      }
      ng-table-pg .py-2 {
        padding-top: 0.5rem !important;
        padding-bottom: 0.5rem !important;
      }
      ng-table-pg .py-3 {
        padding-top: 0.75rem !important;
        padding-bottom: 0.75rem !important;
      }
      ng-table-pg .py-4 {
        padding-top: 1rem !important;
        padding-bottom: 1rem !important;
      }
      ng-table-pg .p-4 {
        padding: 1rem !important;
      }
      ng-table-pg .left-2 {
        left: 0.5rem !important;
      }
      ng-table-pg .top-2\\.5 {
        top: 0.625rem !important;
      }
      ng-table-pg .w-full {
        width: 100% !important;
      }
      ng-table-pg .w-4 {
        width: 1rem !important;
      }
      ng-table-pg .w-5 {
        width: 1.25rem !important;
      }
      ng-table-pg .w-6 {
        width: 1.5rem !important;
      }
      ng-table-pg .w-8 {
        width: 2rem !important;
      }
      ng-table-pg .w-10 {
        width: 2.5rem !important;
      }
      ng-table-pg .w-12 {
        width: 3rem !important;
      }
      ng-table-pg .w-16 {
        width: 4rem !important;
      }
      ng-table-pg .w-20 {
        width: 5rem !important;
      }
      ng-table-pg .w-24 {
        width: 6rem !important;
      }
      ng-table-pg .w-32 {
        width: 8rem !important;
      }
      ng-table-pg .w-36 {
        width: 9rem !important;
      }
      ng-table-pg .w-40 {
        width: 10rem !important;
      }
      ng-table-pg .w-56 {
        width: 14rem !important;
      }
      ng-table-pg .w-2\\/3 {
        width: 66.666667% !important;
      }
      ng-table-pg .h-4 {
        height: 1rem !important;
      }
      ng-table-pg .h-5 {
        height: 1.25rem !important;
      }
      ng-table-pg .h-6 {
        height: 1.5rem !important;
      }
      ng-table-pg .h-8 {
        height: 2rem !important;
      }
      ng-table-pg .h-10 {
        height: 2.5rem !important;
      }
      ng-table-pg .min-w-full {
        min-width: 100% !important;
      }
      ng-table-pg .bg-white {
        background-color: rgb(255 255 255) !important;
      }
      ng-table-pg .bg-gray-50 {
        background-color: rgb(249 250 251) !important;
      }
      ng-table-pg .bg-gray-200 {
        background-color: rgb(229 231 235) !important;
      }
      ng-table-pg .text-gray-400 {
        color: rgb(156 163 175) !important;
      }
      ng-table-pg .text-gray-500 {
        color: rgb(107 114 128) !important;
      }
      ng-table-pg .text-gray-700 {
        color: rgb(55 65 81) !important;
      }
      ng-table-pg .hover\\:bg-gray-50:hover {
        background-color: rgb(249 250 251) !important;
      }
      ng-table-pg .border {
        border-width: 1px !important;
      }
      ng-table-pg .border-t {
        border-top-width: 1px !important;
      }
      ng-table-pg .border-1 {
        border-width: 1px !important;
      }
      ng-table-pg .border-gray-200 {
        border-color: rgb(229 231 235) !important;
      }
      ng-table-pg .border-gray-300 {
        border-color: rgb(209 213 219) !important;
      }
      ng-table-pg .divide-y > * + * {
        border-top-width: 1px !important;
      }
      ng-table-pg .divide-gray-200 > * + * {
        border-color: rgb(229 231 235) !important;
      }
      ng-table-pg .rounded {
        border-radius: 0.25rem !important;
      }
      ng-table-pg .rounded-md {
        border-radius: 0.375rem !important;
      }
      ng-table-pg .rounded-lg {
        border-radius: 0.5rem !important;
      }
      ng-table-pg .rounded-full {
        border-radius: 9999px !important;
      }
      ng-table-pg .overflow-hidden {
        overflow: hidden !important;
      }
      ng-table-pg .overflow-x-auto {
        overflow-x: auto !important;
      }
      ng-table-pg .text-left {
        text-align: left !important;
      }
      ng-table-pg .text-xs {
        font-size: 0.75rem !important;
        line-height: 1rem !important;
      }
      ng-table-pg .text-sm {
        font-size: 0.875rem !important;
        line-height: 1.25rem !important;
      }
      ng-table-pg .text-base {
        font-size: 1rem !important;
        line-height: 1.5rem !important;
      }
      ng-table-pg .font-medium {
        font-weight: 500 !important;
      }
      ng-table-pg .uppercase {
        text-transform: uppercase !important;
      }
      ng-table-pg .tracking-wider {
        letter-spacing: 0.05em !important;
      }
      ng-table-pg .cursor-pointer {
        cursor: pointer !important;
      }
      ng-table-pg .block {
        display: block !important;
      }
      ng-table-pg .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border-width: 0 !important;
      }
      ng-table-pg .shadow {
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
          0 1px 2px -1px rgb(0 0 0 / 0.1) !important;
      }
      ng-table-pg .focus\\:outline-none:focus {
        outline: 2px solid transparent !important;
        outline-offset: 2px !important;
      }
      ng-table-pg .focus\\:ring-indigo-500:focus {
        --tw-ring-color: rgb(99 102 241) !important;
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
          var(--tw-ring-offset-width) var(--tw-ring-offset-color) !important;
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
          calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color) !important;
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
          var(--tw-shadow, 0 0 #0000) !important;
      }
      ng-table-pg .focus\\:border-indigo-500:focus {
        border-color: rgb(99 102 241) !important;
      }
      ng-table-pg .animate-pulse {
        animation: ng-table-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite !important;
      }
      @keyframes ng-table-pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
      ng-table-pg .skeleton {
        background-color: rgb(229 231 235) !important;
        animation: ng-table-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite !important;
        border-radius: 0.25rem !important;
      }
      ng-table-pg table {
        table-layout: auto !important;
        width: 100% !important;
      }
      /* Estilos adicionales para responsividad */
      ng-table-pg .table-container {
        position: relative !important;
        overflow: hidden !important;
        border-radius: 0.5rem !important;
        border: 1px solid rgb(229 231 235) !important;
        background: white !important;
      }
      ng-table-pg .table-container.responsive {
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        scrollbar-width: thin !important;
        scrollbar-color: rgb(156 163 175) transparent !important;
      }
      ng-table-pg .table-container.responsive::-webkit-scrollbar {
        height: 8px !important;
      }
      ng-table-pg .table-container.responsive::-webkit-scrollbar-track {
        background: rgb(243 244 246) !important;
        border-radius: 4px !important;
      }
      ng-table-pg .table-container.responsive::-webkit-scrollbar-thumb {
        background: rgb(156 163 175) !important;
        border-radius: 4px !important;
      }
      ng-table-pg .table-container.responsive::-webkit-scrollbar-thumb:hover {
        background: rgb(107 114 128) !important;
      }
      ng-table-pg .scroll-indicator {
        position: absolute !important;
        top: 0 !important;
        bottom: 0 !important;
        width: 20px !important;
        pointer-events: none !important;
        z-index: 10 !important;
        transition: opacity 0.2s ease !important;
      }
      ng-table-pg .scroll-indicator.left {
        left: 0 !important;
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0.9),
          transparent
        ) !important;
      }
      ng-table-pg .scroll-indicator.right {
        right: 0 !important;
        background: linear-gradient(
          to left,
          rgba(255, 255, 255, 0.9),
          transparent
        ) !important;
      }
      ng-table-pg .scroll-indicator.hidden {
        opacity: 0 !important;
      }
      ng-table-pg .responsive-table {
        width: 100% !important;
        border-collapse: collapse !important;
        table-layout: auto !important;
      }
      ng-table-pg .responsive-table.compact {
        font-size: 0.875rem !important;
      }
      ng-table-pg .responsive-table.compact th,
      ng-table-pg .responsive-table.compact td {
        padding: 0.5rem 0.75rem !important;
      }
      ng-table-pg .sticky-header {
        position: sticky !important;
        top: 0 !important;
        z-index: 20 !important;
        background: rgb(249 250 251) !important;
        backdrop-filter: blur(8px) !important;
        border-bottom: 2px solid rgb(229 231 235) !important;
      }
      ng-table-pg .cell-content {
        max-width: 200px !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }
      ng-table-pg .cell-content.expandable {
        white-space: normal !important;
        word-wrap: break-word !important;
      }
      ng-table-pg .cell-content.truncate {
        display: -webkit-box !important;
        -webkit-line-clamp: 2 !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
      }
      @media (max-width: 480px) {
        ng-table-pg .col-priority-3 {
          display: none !important;
        }
      }
      @media (max-width: 640px) {
        ng-table-pg .col-priority-2 {
          display: none !important;
        }
      }
    `,
  ],
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

  // Nuevas propiedades para responsividad
  @Input() responsive = true; // Habilita el modo responsive
  @Input() stickyHeader = false; // Header fijo al hacer scroll
  @Input() compactMode = false; // Modo compacto para pantallas pequeñas
  @Input() horizontalScroll = true; // Permite scroll horizontal
  @Input() minTableWidth = '800px'; // Ancho mínimo de la tabla
  @Input() maxTableHeight = 'none'; // Altura máxima de la tabla
  @Input() showScrollIndicators = true; // Muestra indicadores de scroll

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

  // Variables para scroll indicators
  showLeftScrollIndicator = false;
  showRightScrollIndicator = false;
  private tableContainer?: HTMLElement;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.filteredData = [...(this.data || [])];
    this.updatePagination();
    this.updatePageDropLists();
    this.setupScrollListeners();
  }

  ngOnDestroy() {
    this.removeScrollListeners();
  }

  /**
   * Configurar listeners para scroll indicators
   */
  private setupScrollListeners(): void {
    setTimeout(() => {
      this.tableContainer = document.querySelector(
        '.table-container'
      ) as HTMLElement;
      if (this.tableContainer && this.showScrollIndicators) {
        this.tableContainer.addEventListener(
          'scroll',
          this.handleScroll.bind(this)
        );
        // Check initial scroll state
        this.handleScroll();
      }
    });
  }

  /**
   * Remover listeners de scroll
   */
  private removeScrollListeners(): void {
    if (this.tableContainer) {
      this.tableContainer.removeEventListener(
        'scroll',
        this.handleScroll.bind(this)
      );
    }
  }

  /**
   * Manejar evento de scroll para mostrar/ocultar indicadores
   */
  private handleScroll(): void {
    if (!this.tableContainer) return;

    const { scrollLeft, scrollWidth, clientWidth } = this.tableContainer;

    this.showLeftScrollIndicator = scrollLeft > 0;
    this.showRightScrollIndicator = scrollLeft < scrollWidth - clientWidth - 1;
  }

  /**
   * Obtener clases CSS para el contenedor de la tabla
   */
  getTableContainerClasses(): string {
    const classes = ['table-container'];

    if (this.responsive && this.horizontalScroll) {
      classes.push('responsive');
    }

    return classes.join(' ');
  }

  /**
   * Obtener clases CSS para la tabla
   */
  getTableClasses(): string {
    const classes = [
      'responsive-table',
      'min-w-full',
      'divide-y',
      'divide-gray-200',
    ];

    if (this.compactMode) {
      classes.push('compact');
    }

    return classes.join(' ');
  }

  /**
   * Obtener clases CSS para el header
   */
  getHeaderClasses(): string {
    const classes = ['bg-gray-50'];

    if (this.stickyHeader) {
      classes.push('sticky-header');
    }

    return classes.join(' ');
  }

  /**
   * Obtener estilos inline para el contenedor de tabla
   */
  getTableContainerStyles(): any {
    const styles: any = {};

    if (this.minTableWidth) {
      styles['min-width'] = this.minTableWidth;
    }

    if (this.maxTableHeight && this.maxTableHeight !== 'none') {
      styles['max-height'] = this.maxTableHeight;
      styles['overflow-y'] = 'auto';
    }

    return styles;
  }

  /**
   * Obtener prioridad de columna para responsividad
   */
  getColumnPriority(column: any): string {
    if (column.priority) {
      return `col-priority-${column.priority}`;
    }
    return 'col-priority-1'; // Por defecto, prioridad alta
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
    const itemsPerPageNumber = Number(this.itemsPerPage);
    const targetIndex = (targetPage - 1) * itemsPerPageNumber;

    moveItemInArray(this.filteredData, currentIndex, targetIndex);

    this.orderChanged.emit({
      item,
      oldIndex: currentIndex,
      newIndex: targetIndex,
      oldPage: Math.floor(currentIndex / itemsPerPageNumber) + 1,
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
    
    // Reset to page 1 when filters change
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
    const itemsPerPageNumber = Number(this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * itemsPerPageNumber;
    this.paginatedData = this.filteredData.slice(
      startIndex,
      startIndex + itemsPerPageNumber
    );
    this.updatePageDropLists();
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    // Ensure itemsPerPage is a number
    this.itemsPerPage = Number(this.itemsPerPage);
    this.updatePagination();
  }

  goToPage(page: number) {
    const totalPages = this.getTotalPages();
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
      this.updatePagination();
    } else if (page > totalPages && totalPages > 0) {
      // If trying to go to a page beyond total pages, go to last page
      this.currentPage = totalPages;
      this.updatePagination();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredData.length / Number(this.itemsPerPage));
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

    const itemsPerPageNumber = Number(this.itemsPerPage);
    // Emitir el evento de cambio
    this.orderChanged.emit({
      item: this.draggedItem,
      oldIndex: sourceIndex,
      newIndex: targetIndex,
      oldPage: Math.floor(sourceIndex / itemsPerPageNumber) + 1,
      newPage: Math.floor(targetIndex / itemsPerPageNumber) + 1,
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
    const itemsPerPageNumber = Number(this.itemsPerPage);
    const currentPageOffset = (this.currentPage - 1) * itemsPerPageNumber;

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
        Math.floor((previousIndex + currentPageOffset) / itemsPerPageNumber) + 1,
      newPage:
        Math.floor((currentIndex + currentPageOffset) / itemsPerPageNumber) + 1,
      globalIndex: currentIndex + currentPageOffset,
    });

    this.updatePagination();
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }
}
