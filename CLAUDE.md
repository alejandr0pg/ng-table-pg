# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **ng-table-pg**, a responsive Angular table component library that provides advanced features like drag-and-drop, filtering, pagination, internationalization, and export functionality. The library is designed to work with Angular 19+ and includes self-contained CSS styles.

## Development Commands

### Essential Commands
- `npm run build` - Build the library for production (uses `ng build table-lib --configuration production`)
- `npm run build:dev` - Build the library for development
- `npm run build:css` - Build CSS using Tailwind (for development only)
- `npm run test` - Run tests via Karma
- `npm run start` - Start development server for example app
- `npm run prepublishOnly` - Pre-publish build (automatically runs production build)

### Library-Specific Commands
- `ng build table-lib` - Build the library project
- `ng test table-lib` - Run tests for the library only
- `ng serve` - Serve the example application at `http://localhost:4200`

## Project Architecture

### Workspace Structure
This is an Angular workspace with two projects:
- **table-lib** (`projects/table-lib/`): The main library containing the table component
- **example** (`projects/example/`): Example application demonstrating the library usage

### Library Structure (`projects/table-lib/`)
```
├── src/lib/
│   ├── components/          # Sub-components
│   │   ├── button-dropdown/ # Action buttons dropdown
│   │   ├── content/         # Row content renderer
│   │   ├── row/             # Table row component
│   │   └── skeleton/        # Loading skeleton
│   ├── i18n/               # Translation files (en.json, es.json)
│   ├── pipes/              # Custom pipes (Web3Utils)
│   ├── table.component.ts   # Main table component
│   ├── table.interfaces.ts  # TypeScript interfaces
│   ├── table.service.ts     # Table service
│   ├── table.styles.css     # Self-contained CSS styles
│   └── table.template.html  # Component template
├── public-api.ts           # Public API exports
└── package.json           # Library-specific dependencies
```

### Key Component Architecture
The main `TableComponent` is a standalone Angular component that:
- Uses `ViewEncapsulation.None` for global CSS styles
- Implements `OnInit` and `OnChanges` for data management
- Includes extensive responsive design features
- Supports drag-and-drop via Angular CDK
- Integrates with `@ngx-translate/core` for internationalization
- Uses `file-saver` and `xlsx` for export functionality

## Styling System

### Self-Contained CSS
- The library uses **self-contained CSS** with all necessary Tailwind classes compiled into `table.styles.css`
- No external Tailwind dependency required in consuming projects
- Inline styles in component use `!important` to ensure precedence
- Responsive design with mobile-first approach

### Responsive Design
- **Priority-based column visibility**: Columns have priority levels (1-3) that hide on smaller screens
- **Horizontal scroll**: Controlled scroll with visual indicators
- **Sticky header**: Optional sticky header with backdrop filter
- **Breakpoints**: 
  - Mobile (< 640px): Hide priority 2 and 3 columns
  - Tablet (< 768px): Hide priority 3 columns
  - Desktop (≥ 768px): Show all columns

## Key Features Implementation

### Drag and Drop
- Uses Angular CDK `DragDropModule`
- Supports cross-page dragging with automatic page switching
- Emits `ITableOrderChange` events with detailed positioning info
- Includes visual feedback and hover delays

### Internationalization
- Uses `@ngx-translate/core` for translations
- Includes built-in English and Spanish translations
- Supports custom translation paths via `TableTranslationsModule`
- Async translation loading for export functionality

### Export Functionality
- CSV export with proper character encoding and escaping
- Excel export with column width optimization
- Translates headers and status values during export
- Handles various data types (dates, currency, boolean, status)

## Data Types and Interfaces

### Core Interfaces
- `ITableColumns`: Column configuration with responsive properties
- `ITableActions`: Row action buttons with conditional visibility
- `ITableButtons`: Global action buttons
- `ITableOrderChange`: Drag-and-drop event data

### Supported Column Types
- `date`: Date formatting
- `date-time`: Date and time formatting
- `currency`: Currency formatting
- `boolean`: Yes/No translation
- `status`: Status badge rendering
- `state`: State translation
- `wallet`: Wallet address truncation

## Development Guidelines

### Testing
- Use Karma for unit tests
- Test files follow `.spec.ts` naming convention
- Coverage reports generated in `/coverage/` directory

### Building for Production
- Always use `npm run build` for production builds
- Library builds to `/dist/table-lib/`
- CSS is automatically processed and included
- Assets (i18n files) are copied to distribution

### Working with Translations
- Translation files in `/src/lib/i18n/` directory
- Use `TABLE.*` namespace for table-related translations
- Use `STATUS.*` namespace for status translations
- Support both synchronous and asynchronous translation loading

### Responsive Development
- Test on multiple breakpoints (mobile, tablet, desktop)
- Use priority levels on columns appropriately
- Consider scroll indicators and sticky headers
- Test drag-and-drop across different screen sizes

## Dependencies

### Runtime Dependencies
- `@angular/core` ^19.1.0
- `@angular/common` ^19.1.0
- `@angular/cdk` ^19.1.3
- `@ngx-translate/core` >=15.0.0
- `file-saver` ^2.0.5
- `xlsx` ^0.18.5

### Development Dependencies
- `tailwindcss` ^3.3.0 (for CSS compilation only)
- `ng-packagr` ^19.1.0 (for library packaging)

## Important Notes

- The library maintains backward compatibility with existing implementations
- CSS styles are self-contained and don't conflict with host applications
- The component uses Angular's standalone architecture
- Export functionality requires proper translation setup
- Drag-and-drop requires Angular CDK to be installed in the consuming project