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
  exampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: false },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'pending' }
  ];

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status', type: 'status' }
  ];

  onOrderChange(event: any) {
    console.log('Order changed:', event);
  }
}
