import { Component } from '@angular/core';

@Component({
  selector: 'ng-table-pg-skeleton',
  standalone: true,
  template: `
    <div class="space-y-6">
      <!-- Search and buttons -->
      <div class="flex justify-between items-center">
        <div class="skeleton h-10 w-2/3"></div>
        <div class="flex space-x-2">
          <div class="skeleton h-10 w-24"></div>
          <div class="skeleton h-10 w-36"></div>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              @for (column of [1,2,3,4,5,6,7,8,9]; track column) {
              <th class="px-6 py-3">
                <div class="skeleton h-4 w-full"></div>
              </th>
              }
            </tr>
          </thead>
          <tbody>
            @for (row of [1,2,3,4,5,6,7,8,9,10]; track row) {
            <tr class="border-t border-gray-200">
              <td class="px-6 py-4"><div class="skeleton h-4 w-24"></div></td>
              <td class="px-6 py-4"><div class="skeleton h-4 w-24"></div></td>
              <td class="px-6 py-4">
                <div class="skeleton h-6 w-8 rounded-full"></div>
              </td>
              <td class="px-6 py-4"><div class="skeleton h-4 w-32"></div></td>
              <td class="px-6 py-4"><div class="skeleton h-4 w-40"></div></td>
              <td class="px-6 py-4"><div class="skeleton h-4 w-32"></div></td>
              <td class="px-6 py-4"><div class="skeleton h-4 w-16"></div></td>
              <td class="px-6 py-4">
                <div class="skeleton h-6 w-16 rounded-full"></div>
              </td>
              <td class="px-6 py-4"><div class="skeleton h-6 w-6"></div></td>
            </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="skeleton h-4 w-16"></div>
          <div class="skeleton h-8 w-12"></div>
          <div class="skeleton h-4 w-24"></div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="skeleton h-8 w-8"></div>
          <div class="skeleton h-8 w-8"></div>
          <div class="skeleton h-8 w-8"></div>
          <div class="skeleton h-4 w-4"></div>
          <div class="skeleton h-8 w-8"></div>
          <div class="skeleton h-8 w-8"></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .skeleton {
        @apply bg-gray-200 animate-pulse rounded;
      }
    `,
  ],
})
export class SkeletonTableComponent {}
