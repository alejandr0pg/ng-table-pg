import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dropdown-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block">
      <button
        #dropdownButton
        (click)="toggleDropdown($event)"
        [class]="buttonClass"
      >
        <ng-content select="[buttonContent]"></ng-content>
      </button>
      <div
        *ngIf="isOpen"
        #dropdownContent
        [ngStyle]="dropdownStyle"
        [ngClass]="{ invisible: dropdownStyle.top == '-9999px' }"
        class="fixed rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
        (click)="$event.stopPropagation()"
      >
        <div class="py-1">
          <ng-content select="[dropdownContent]"></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class DropdownButtonComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
  @ViewChild('dropdownContent') dropdownContent!: ElementRef;

  @Input() buttonClass = 'text-gray-400 hover:text-gray-600';
  @Input() isOpen = false;
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  dropdownStyle: any = {
    top: `-9999px`,
    left: `-9999px`,
  };
  private destroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.updateDropdownPosition(); // Initial position
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target))
      this.closeDropdown();
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.isOpen) {
      this.updateDropdownPosition();
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen ? this.closeDropdown() : this.openDropdown();
  }

  private openDropdown() {
    this.opened.emit();
    this.isOpen = true;
    setTimeout(() => this.updateDropdownPosition(), 10);
  }

  private closeDropdown() {
    this.dropdownStyle = {
      top: `-9999px`,
      left: `-9999px`,
    };

    this.isOpen = false;
    this.closed.emit();
  }

  private updateDropdownPosition() {
    if (!this.dropdownButton || !this.dropdownContent) return;

    const buttonRect =
      this.dropdownButton.nativeElement.getBoundingClientRect();
    const dropdownRect =
      this.dropdownContent.nativeElement.getBoundingClientRect();
    const scrollableContainer = this.findScrollableContainer(
      this.dropdownButton.nativeElement
    );

    let top = buttonRect.bottom + 10;
    let left = buttonRect.right - dropdownRect.width;

    if (scrollableContainer) {
      const containerRect = scrollableContainer.getBoundingClientRect();

      if (top + dropdownRect.height > window.innerHeight) {
        top = buttonRect.top - dropdownRect.height - 10;
        if (top < 10) top = 80;
      }

      if (
        top + dropdownRect.height <= window.innerHeight &&
        top + dropdownRect.height > containerRect.bottom
      ) {
        top = buttonRect.top - dropdownRect.height - 10;
        if (top < containerRect.top) top = containerRect.top;
      }

      if (left < containerRect.left) {
        left = containerRect.left;
      }
    } else {
      if (top + dropdownRect.height > window.innerHeight) {
        top = buttonRect.top - dropdownRect.height - 10;
        if (top < 10) top = 80;
      }

      if (left < 0) {
        left = 0;
      }

      if (left + dropdownRect.width > window.innerWidth) {
        left = window.innerWidth - dropdownRect.width;
      }
    }

    this.dropdownStyle = {
      top: `${top}px`,
      left: `${left}px`,
      overflowY: 'auto',
      overflowX: 'hidden',
    };

    this.cdr.detectChanges();
  }

  private findScrollableContainer(element: HTMLElement): HTMLElement | null {
    while (element && element !== document.body) {
      const style = window.getComputedStyle(element);
      const overflow =
        style.getPropertyValue('overflow') +
        style.getPropertyValue('overflow-y') +
        style.getPropertyValue('overflow-x');

      if (
        /(auto|scroll)/.test(overflow) &&
        (element.scrollHeight > element.clientHeight ||
          element.scrollWidth > element.clientWidth)
      ) {
        return element;
      }
      element = element.parentElement as HTMLElement;
    }
    return null;
  }
}
