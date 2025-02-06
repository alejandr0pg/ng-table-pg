import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'table-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="whitespace-nowrap">{{ text }}</span>
  `,
})
export class TableRowComponent {
  @Input() text!: any;
}
