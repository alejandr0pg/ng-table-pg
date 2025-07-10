import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from 'ng-table-pg';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Table Library Demo</h1>

      <div class="mb-4">
        <h2 class="text-lg font-semibold mb-2">Table Configuration</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <label class="flex items-center">
            <input type="checkbox" [(ngModel)]="showAllColumns" class="mr-2" (change)="toggleColumns()">
            Show All Columns (9)
          </label>
          <label class="flex items-center">
            <input type="checkbox" [(ngModel)]="alwaysShowScrollbar" class="mr-2">
            Always Show Scrollbar
          </label>
          <label class="flex items-center">
            <input type="checkbox" [(ngModel)]="hideColumnsOnResize" class="mr-2">
            Hide Columns on Resize
          </label>
          <label class="flex items-center">
            <span class="mr-2">Scrollbar Style:</span>
            <select [(ngModel)]="scrollbarStyle" class="border rounded px-2 py-1">
              <option value="default">Default</option>
              <option value="prominent">Prominent</option>
              <option value="minimal">Minimal</option>
            </select>
          </label>
        </div>
        <p class="text-sm text-gray-600">
          <strong>Test:</strong> {{ showAllColumns ? '9 columns (forces scroll)' : '4 columns (auto-width)' }} - 
          Resize window to see responsive behavior
        </p>
      </div>

      <ng-table-pg
        [data]="exampleData"
        [columns]="showAllColumns ? allColumns : basicColumns"
        [loading]="false"
        [enableDragDrop]="true"
        [enableExport]="true"
        [alwaysShowScrollbar]="alwaysShowScrollbar"
        [scrollbarStyle]="scrollbarStyle"
        [hideColumnsOnResize]="hideColumnsOnResize"
        (orderChanged)="onOrderChange($event)"
      ></ng-table-pg>
    </div>
  `
})
export class AppComponent {
  // Generate more data to test pagination and scrolling
  exampleData = Array(35).fill(null).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'inactive' : 'pending',
    createdAt: new Date(2023, 0, 1 + i).toISOString(),
    role: i % 2 === 0 ? 'admin' : 'user',
    department: i % 4 === 0 ? 'Engineering' : i % 4 === 1 ? 'Marketing' : i % 4 === 2 ? 'Sales' : 'Support',
    location: i % 3 === 0 ? 'New York' : i % 3 === 1 ? 'San Francisco' : 'London',
    salary: Math.floor(Math.random() * 50000) + 50000
  }));

  // Columnas básicas (pocas columnas para probar auto-width)
  basicColumns = [
    { key: 'id', label: 'ID', priority: 1 },
    { key: 'name', label: 'Name', priority: 1 },
    { key: 'email', label: 'Email', priority: 2 },
    { key: 'status', label: 'Status', type: 'status', priority: 1 }
  ];

  // Todas las columnas (muchas columnas para probar scroll)
  allColumns = [
    { key: 'id', label: 'ID', width: 80, priority: 1 },
    { key: 'name', label: 'Name', width: 150, priority: 1 },
    { key: 'email', label: 'Email', width: 250, priority: 2 },
    { key: 'status', label: 'Status', type: 'status', width: 120, priority: 1 },
    { key: 'createdAt', label: 'Created', type: 'date', width: 120, priority: 3 },
    { key: 'role', label: 'Role', width: 100, priority: 2 },
    { key: 'department', label: 'Department', width: 150, priority: 3 },
    { key: 'location', label: 'Location', width: 150, priority: 3 },
    { key: 'salary', label: 'Salary', type: 'currency', width: 120, priority: 2 }
  ];

  // Configuration
  showAllColumns = false;
  alwaysShowScrollbar = false;
  scrollbarStyle: 'default' | 'prominent' | 'minimal' = 'default';
  hideColumnsOnResize = false;

  toggleColumns() {
    // Method called when checkbox changes
  }

  onOrderChange(event: any) {
    console.log('Order changed:', event);
  }
}
