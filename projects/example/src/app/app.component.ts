import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'ng-table-pg';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Table Library Demo</h1>

      <ng-table-pg
        [data]="exampleData"
        [columns]="columns"
        [loading]="false"
        [enableDragDrop]="true"
        [enableExport]="true"
        (orderChanged)="onOrderChange($event)"
      ></ng-table-pg>
    </div>
  `
})
export class AppComponent {
  // Generate more data to test pagination
  exampleData = Array(35).fill(null).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'inactive' : 'pending',
    createdAt: new Date(2023, 0, 1 + i).toISOString(),
    role: i % 2 === 0 ? 'admin' : 'user'
  }));

  columns = [
    { key: 'id', label: 'ID', width: 80 },
    { key: 'name', label: 'Name', width: 150 },
    { key: 'email', label: 'Email', width: 200 },
    { key: 'status', label: 'Status', type: 'status', width: 120 },
    { key: 'createdAt', label: 'Created', type: 'date', width: 120 },
    { key: 'role', label: 'Role', width: 100 }
  ];

  onOrderChange(event: any) {
    console.log('Order changed:', event);
  }
}
