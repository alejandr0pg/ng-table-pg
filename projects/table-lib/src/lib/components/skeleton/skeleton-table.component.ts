import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ng-table-pg-skeleton',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="space-y-6">
      <!-- Search and buttons -->
      <div
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
      >
        <div class="skeleton h-10 w-full sm:w-2/3"></div>
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="skeleton h-10 w-full sm:w-24"></div>
          <div class="skeleton h-10 w-full sm:w-36"></div>
        </div>
      </div>

      <!-- Table Container with overflow -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-full">
            <!-- Desktop Headers (hidden on mobile) -->
            <thead class="bg-gray-50 hidden md:table-header-group">
              <tr>
                <th class="px-3 sm:px-6 py-3 text-left">
                  <div class="skeleton h-4 w-8"></div>
                </th>
                <th class="px-3 sm:px-6 py-3 text-left">
                  <div class="skeleton h-4 w-16"></div>
                </th>
                <th class="px-3 sm:px-6 py-3 text-left">
                  <div class="skeleton h-4 w-12"></div>
                </th>
                <th class="px-3 sm:px-6 py-3 text-left">
                  <div class="skeleton h-4 w-20"></div>
                </th>
                <th class="px-3 sm:px-6 py-3 text-left">
                  <div class="skeleton h-4 w-24"></div>
                </th>
                <th class="px-3 sm:px-6 py-3 text-left">
                  <div class="skeleton h-4 w-20"></div>
                </th>
                <th class="px-3 sm:px-6 py-3 text-left">
                  <div class="skeleton h-4 w-16"></div>
                </th>
                <th class="px-3 sm:px-6 py-3 text-left">
                  <div class="skeleton h-4 w-12"></div>
                </th>
                <th class="px-3 sm:px-6 py-3 text-left">
                  <div class="skeleton h-4 w-8"></div>
                </th>
              </tr>
            </thead>

            <!-- Mobile Headers (visible only on mobile) -->
            <thead class="bg-gray-50 md:hidden">
              <tr>
                <th class="px-3 py-3 text-left">
                  <div class="skeleton h-4 w-16"></div>
                </th>
                <th class="px-3 py-3 text-left">
                  <div class="skeleton h-4 w-20"></div>
                </th>
                <th class="px-3 py-3 text-left">
                  <div class="skeleton h-4 w-12"></div>
                </th>
                <th class="px-3 py-3 text-left">
                  <div class="skeleton h-4 w-8"></div>
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <!-- Desktop Rows (hidden on mobile) -->
              @for (row of [1,2,3,4,5,6,7,8,9,10]; track row) {
              <tr class="border-t border-gray-200 hidden md:table-row">
                <td class="px-3 sm:px-6 py-4">
                  <div class="skeleton h-4 w-8"></div>
                </td>
                <td class="px-3 sm:px-6 py-4">
                  <div class="skeleton h-4 w-20"></div>
                </td>
                <td class="px-3 sm:px-6 py-4">
                  <div class="skeleton h-6 w-8 rounded-full"></div>
                </td>
                <td class="px-3 sm:px-6 py-4">
                  <div class="skeleton h-4 w-32"></div>
                </td>
                <td class="px-3 sm:px-6 py-4">
                  <div class="skeleton h-4 w-28"></div>
                </td>
                <td class="px-3 sm:px-6 py-4">
                  <div class="skeleton h-4 w-24"></div>
                </td>
                <td class="px-3 sm:px-6 py-4">
                  <div class="skeleton h-4 w-16"></div>
                </td>
                <td class="px-3 sm:px-6 py-4">
                  <div class="skeleton h-6 w-16 rounded-full"></div>
                </td>
                <td class="px-3 sm:px-6 py-4">
                  <div class="skeleton h-6 w-6"></div>
                </td>
              </tr>
              }

              <!-- Mobile Rows (visible only on mobile) -->
              @for (row of [1,2,3,4,5,6,7,8,9,10]; track row) {
              <tr class="border-t border-gray-200 md:hidden">
                <td class="px-3 py-4">
                  <div class="skeleton h-4 w-16"></div>
                </td>
                <td class="px-3 py-4">
                  <div class="skeleton h-4 w-20"></div>
                </td>
                <td class="px-3 py-4">
                  <div class="skeleton h-6 w-16 rounded-full"></div>
                </td>
                <td class="px-3 py-4">
                  <div class="skeleton h-6 w-6"></div>
                </td>
              </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <div class="skeleton h-4 w-12"></div>
          <div class="skeleton h-8 w-12"></div>
          <div class="skeleton h-4 w-16"></div>
        </div>
        <div class="flex items-center justify-center sm:justify-end gap-2">
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
      /* Estilos específicos del skeleton con !important para máxima compatibilidad */
      ng-table-pg-skeleton .skeleton {
        background-color: rgb(229 231 235) !important;
        animation: ng-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite !important;
        border-radius: 0.25rem !important;
      }

      @keyframes ng-skeleton-pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      /* Responsive utilities con !important */
      ng-table-pg-skeleton .flex {
        display: flex !important;
      }

      ng-table-pg-skeleton .flex-col {
        flex-direction: column !important;
      }

      ng-table-pg-skeleton .gap-2 {
        gap: 0.5rem !important;
      }

      ng-table-pg-skeleton .gap-4 {
        gap: 1rem !important;
      }

      ng-table-pg-skeleton .justify-center {
        justify-content: center !important;
      }

      ng-table-pg-skeleton .justify-between {
        justify-content: space-between !important;
      }

      ng-table-pg-skeleton .items-center {
        align-items: center !important;
      }

      ng-table-pg-skeleton .overflow-x-auto {
        overflow-x: auto !important;
      }

      ng-table-pg-skeleton .min-w-full {
        min-width: 100% !important;
      }

      ng-table-pg-skeleton .w-full {
        width: 100% !important;
      }

      ng-table-pg-skeleton .hidden {
        display: none !important;
      }

      /* Responsive breakpoints */
      @media (min-width: 640px) {
        ng-table-pg-skeleton .sm\\:flex-row {
          flex-direction: row !important;
        }

        ng-table-pg-skeleton .sm\\:justify-between {
          justify-content: space-between !important;
        }

        ng-table-pg-skeleton .sm\\:items-center {
          align-items: center !important;
        }

        ng-table-pg-skeleton .sm\\:justify-end {
          justify-content: flex-end !important;
        }

        ng-table-pg-skeleton .sm\\:w-2\\/3 {
          width: 66.666667% !important;
        }

        ng-table-pg-skeleton .sm\\:w-24 {
          width: 6rem !important;
        }

        ng-table-pg-skeleton .sm\\:w-36 {
          width: 9rem !important;
        }

        ng-table-pg-skeleton .sm\\:px-6 {
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
        }
      }

      @media (min-width: 768px) {
        ng-table-pg-skeleton .md\\:hidden {
          display: none !important;
        }

        ng-table-pg-skeleton .md\\:table-header-group {
          display: table-header-group !important;
        }

        ng-table-pg-skeleton .md\\:table-row {
          display: table-row !important;
        }
      }

      /* Espaciado y padding */
      ng-table-pg-skeleton .space-y-6 > * + * {
        margin-top: 1.5rem !important;
      }

      ng-table-pg-skeleton .px-3 {
        padding-left: 0.75rem !important;
        padding-right: 0.75rem !important;
      }

      ng-table-pg-skeleton .py-3 {
        padding-top: 0.75rem !important;
        padding-bottom: 0.75rem !important;
      }

      ng-table-pg-skeleton .py-4 {
        padding-top: 1rem !important;
        padding-bottom: 1rem !important;
      }

      ng-table-pg-skeleton .text-left {
        text-align: left !important;
      }

      ng-table-pg-skeleton .bg-white {
        background-color: rgb(255 255 255) !important;
      }

      ng-table-pg-skeleton .bg-gray-50 {
        background-color: rgb(249 250 251) !important;
      }

      ng-table-pg-skeleton .rounded-lg {
        border-radius: 0.5rem !important;
      }

      ng-table-pg-skeleton .rounded-full {
        border-radius: 9999px !important;
      }

      ng-table-pg-skeleton .shadow {
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
          0 1px 2px -1px rgb(0 0 0 / 0.1) !important;
      }

      ng-table-pg-skeleton .overflow-hidden {
        overflow: hidden !important;
      }

      ng-table-pg-skeleton .border-t {
        border-top-width: 1px !important;
      }

      ng-table-pg-skeleton .border-gray-200 {
        border-color: rgb(229 231 235) !important;
      }

      ng-table-pg-skeleton .divide-y > * + * {
        border-top-width: 1px !important;
      }

      ng-table-pg-skeleton .divide-gray-200 > * + * {
        border-color: rgb(229 231 235) !important;
      }

      /* Tamaños específicos */
      ng-table-pg-skeleton .h-4 {
        height: 1rem !important;
      }
      ng-table-pg-skeleton .h-6 {
        height: 1.5rem !important;
      }
      ng-table-pg-skeleton .h-8 {
        height: 2rem !important;
      }
      ng-table-pg-skeleton .h-10 {
        height: 2.5rem !important;
      }
      ng-table-pg-skeleton .w-4 {
        width: 1rem !important;
      }
      ng-table-pg-skeleton .w-6 {
        width: 1.5rem !important;
      }
      ng-table-pg-skeleton .w-8 {
        width: 2rem !important;
      }
      ng-table-pg-skeleton .w-12 {
        width: 3rem !important;
      }
      ng-table-pg-skeleton .w-16 {
        width: 4rem !important;
      }
      ng-table-pg-skeleton .w-20 {
        width: 5rem !important;
      }
      ng-table-pg-skeleton .w-24 {
        width: 6rem !important;
      }
      ng-table-pg-skeleton .w-28 {
        width: 7rem !important;
      }
      ng-table-pg-skeleton .w-32 {
        width: 8rem !important;
      }
    `,
  ],
})
export class SkeletonTableComponent {}
