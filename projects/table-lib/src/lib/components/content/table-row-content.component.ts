import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableRowComponent } from '../row/table-row.component';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'table-row-content',
  standalone: true,
  imports: [CommonModule, TableRowComponent, PipesModule],
  template: `
    <ng-container *ngIf="isArrayItemValue; else singleItemTemplate">
      <ng-container *ngFor="let item of itemTransformed">
        <span class="mr-2 last:mr-0">
          <ng-container
            *ngTemplateOutlet="contentTemplate; context: { $implicit: item }"
          ></ng-container>
        </span>
      </ng-container>
    </ng-container>
    <ng-template #singleItemTemplate>
      <ng-container
        *ngTemplateOutlet="
          contentTemplate;
          context: { $implicit: itemTransformed }
        "
      ></ng-container>
    </ng-template>

    <ng-template #contentTemplate let-value>
      <ng-container [ngSwitch]="column.type || column.key">
        <!-- Caso 'step' -->
        <ng-container *ngSwitchCase="'step'">
          <span
            [ngClass]="{
              'px-2 py-1 rounded-full text-xs font-semibold': true,
              'bg-green-100 text-green-800':
                getStatus(item.step) === 'completed',
              'bg-yellow-100 text-yellow-800':
                getStatus(item.step) === 'in-progress',
              'bg-blue-100 text-blue-800': getStatus(item.step) === 'pending'
            }"
          >
            <table-row [text]="value"></table-row>
          </span>
        </ng-container>

        <!-- Caso 'status' -->
        <ng-container *ngSwitchCase="'status'">
          <span [ngClass]="getStatusClasses(item[column.key])">
            <span *ngIf="item[column.key] === undefined">Inactive</span>

            <ng-container [ngSwitch]="item.status || item[column.key]">
              <span *ngSwitchCase="true">Active</span>
              <span *ngSwitchCase="false">Inactive</span>
              <span *ngSwitchCase="'partial'">Partial Active</span>
              <span *ngSwitchCase="'reject'">Rejected</span>
              <span *ngSwitchCase="'pending_to_send'">Pending to send</span>
              <span *ngSwitchCase="'pending'">Pending</span>
              <span *ngSwitchCase="'approved'">Approved</span>
              <table-row
                *ngSwitchDefault
                [text]="value | titlecase"
              ></table-row>
            </ng-container>
          </span>
        </ng-container>

        <!-- Caso 'HTML' -->
        <ng-container *ngSwitchCase="'html'">
          <span [innerHTML]="value"></span>
        </ng-container>

        <!-- Caso 'status:expired' -->
        <ng-container *ngSwitchCase="'status:expired'">
          <span
            [ngClass]="{
            'px-2 py-1 rounded-full text-xs font-semibold text-nowrap': true,
            'bg-green-100 text-green-800':  item[column.key] === true,
            'bg-red-100 text-red-800':  item[column.key] === false,
          }"
          >
            <ng-container [ngSwitch]="item[column.key]">
              <span *ngSwitchCase="true">Active</span>
              <span *ngSwitchCase="false">Expired</span>
              <table-row
                *ngSwitchDefault
                [text]="value | titlecase"
              ></table-row>
            </ng-container>
          </span>
        </ng-container>

        <!-- Caso 'state' -->
        <ng-container *ngSwitchCase="'state'">
          <span
            [ngClass]="{
              'px-2 py-1 rounded-full text-xs font-semibold text-nowrap': true,
              'bg-blue-100 text-blue-800': item.state === 'pre-approved',
              'bg-green-100 text-green-800': item.state === 'approved',
              'bg-yellow-100 text-yellow-800': item.state === 'pending',
              'bg-red-100 text-red-800': item.state === 'rejected'
            }"
          >
            <table-row [text]="value | titlecase"></table-row>
          </span>
        </ng-container>

        <!-- Caso 'date' -->
        <ng-container *ngSwitchCase="'date'">
          <ng-container *ngIf="value">
            <table-row [text]="value | date : 'yyyy-MM-dd'"></table-row>
          </ng-container>
        </ng-container>

        <!-- Caso 'boolean' -->
        <ng-container *ngSwitchCase="'boolean'">
          {{ value ? 'Sí' : 'No' }}
        </ng-container>

        <!-- Caso 'date-time' -->
        <ng-container *ngSwitchCase="'date-time'">
          <ng-container *ngIf="value">
            <table-row [text]="value | date : 'dd/MM/yyyy HH:mm'"></table-row>
          </ng-container>
        </ng-container>

        <!-- Caso 'timestamp' -->
        <ng-container *ngSwitchCase="'timestamp'">
          <ng-container *ngIf="value">
            <table-row
              [text]="value.toDate() | date : 'dd/MM/yyyy HH:mm'"
            ></table-row>
          </ng-container>
        </ng-container>

        <!-- Caso 'json' -->
        <ng-container *ngSwitchCase="'json'">
          <ng-container *ngIf="value">
            <pre
              class="bg-slate-50 rounded-lg p-2 text-sm font-mono text-slate-700 overflow-x-auto max-h-[150px] overflow-y-auto shadow-sm border border-slate-200"
            ><code>{{ formatJson(value) }}</code></pre>
          </ng-container>
        </ng-container>

        <!-- Caso 'currency' -->
        <ng-container *ngSwitchCase="'currency'">
          <table-row
            [text]="value | currency : 'USD' : 'symbol' : '1.4-4'"
          ></table-row>
        </ng-container>

        <!-- Casos adicionales -->
        <ng-container *ngSwitchCase="'uppercase'">
          <table-row [text]="value | uppercase"></table-row>
        </ng-container>

        <ng-container *ngSwitchCase="'titlecase'">
          <table-row [text]="value | titlecase"></table-row>
        </ng-container>

        <ng-container *ngSwitchCase="'wallet'">
          <table-row [text]="value | web3Utils : 'wallet'"></table-row>
        </ng-container>

        <ng-container *ngSwitchCase="'badget'">
          <span
            class="px-2 py-1 text-nowrap rounded-full text-xs font-semibold bg-gray-100 text-gray-800"
          >
            <table-row [text]="value"></table-row>
          </span>
        </ng-container>

        <ng-container *ngSwitchCase="'badget:info'">
          <span
            class="px-2 py-1 rounded-full text-nowrap text-xs font-semibold bg-blue-100 text-blue-800"
          >
            <table-row [text]="value"></table-row>
          </span>
        </ng-container>

        <ng-container *ngSwitchDefault>
          <table-row [text]="value"></table-row>
        </ng-container>
      </ng-container>
    </ng-template>
  `,
})
export class TableRowContentComponent implements OnChanges {
  @Input() item!: any;
  @Input() column!: any;
  @Input() itemValue!: any;

  itemTransformed!: any;
  isArrayItemValue = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemValue']) {
      this.isArrayItemValue = Array.isArray(this.itemValue);
      this.itemTransformed = this.column.transform
        ? this.column.transform(this.itemValue, this.item)
        : this.itemValue;
    }
  }

  getStatus(step: string): string {
    const [current, total] = step.split('/').map(Number);
    if (current === total) return 'completed';
    if (current === 1) return 'pending';
    return 'in-progress';
  }

  getStatusClass(status: any) {
    const normalizedStatus =
      typeof status === 'string' ? status.toLowerCase() : status || 'inactive';
    switch (normalizedStatus) {
      case 'active':
      case 'activa':
      case 'completed':
      case true:
        return 'bg-green-100 text-green-800';
      case 'inactive':
      case 'inactiva':
      case 'refused':
      case 'rejected':
      case 'reject':
      case false:
        return 'bg-red-100 text-red-800';
      case 'pending_to_send':
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'partial':
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return '';
    }
  }

  getStatusClasses(status: any) {
    return {
      'px-2 py-1 rounded-full text-xs font-semibold text-nowrap': true,
      [this.getStatusClass(status)]: true,
    };
  }

  formatJson(value: any): string {
    try {
      const parsed = typeof value === 'string' ? JSON.parse(value) : value;
      const formatIndentation = (str: string) => {
        const lines = str.split('\n');
        let indent = 0;

        return lines
          .map((line) => {
            // Reducir indentación para líneas que cierran bloques
            if (line.includes('}') || line.includes(']')) {
              indent -= 2;
            }

            const currentIndent = ' '.repeat(Math.max(0, indent));
            const formattedLine = currentIndent + line.trim();

            // Aumentar indentación para la siguiente línea si esta abre un bloque
            if (line.includes('{') || line.includes('[')) {
              indent += 2;
            }

            return formattedLine;
          })
          .join('\n');
      };

      return formatIndentation(JSON.stringify(parsed, null, 2))
        .trim()
        .replace(/": "/g, '": "') // Espaciado consistente después de los dos puntos
        .replace(/,$/gm, ','); // Asegurar que las comas queden en la misma línea
    } catch (e) {
      return String(value);
    }
  }
}
