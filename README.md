# NgTablePg

Un componente de tabla potente y flexible para aplicaciones Angular con funciones integradas de ordenamiento, filtrado, paginación y arrastrar y soltar.

## Autor

- **Nombre:** Alejandro Pérez Granado
- **Email:** alejo.mde
- **GitHub:** [@alejandr0pg](https://github.com/alejandr0pg)

## Características

- ✨ Diseño responsive con Tailwind CSS
- 🔍 Funcionalidad de búsqueda
- 🔄 Ordenamiento de columnas
- 📊 Filtros personalizados
- 📱 Paginación
- 📎 Reordenamiento de filas con arrastrar y soltar
- 📥 Exportación a CSV y Excel
- 🎨 Estilos personalizables
- 🌐 Soporte para internacionalización
- 💫 Estado de carga con skeleton loader
- 🛠️ Botones de acción personalizados
- 📋 Plantillas de columnas personalizadas

## Instalación

```bash
npm install ng-table-pg
```

### Dependencias

Instala las dependencias requeridas:

```bash
npm install @angular/cdk file-saver xlsx @ngx-translate/core
```

## Configuración de Desarrollo

### Servidor de desarrollo

Inicia el servidor de desarrollo:

```bash
ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

### Compilación de la Librería

Compila la librería:

```bash
ng build table-lib
```

Los archivos compilados se almacenarán en el directorio `dist/`.

### Ejecutar Pruebas

Ejecuta las pruebas unitarias vía [Karma](https://karma-runner.github.io):

```bash
ng test table-lib
```

## Guía de Uso

### Implementación Básica

1. Importa el componente en tu módulo:

```typescript
import { TableComponent } from 'ng-table-pg';

@NgModule({
  imports: [
    TableComponent
  ]
})
```

2. Úsalo en tu componente:

```typescript
import { Component } from '@angular/core';

@Component({
  template: `
    <ng-table-pg
      [data]="items"
      [columns]="columns"
      [loading]="loading"
    ></ng-table-pg>
  `
})
export class YourComponent {
  items = [...];
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Correo' }
  ];
}
```

### Opciones de Configuración

#### Configuración de Columnas

```typescript
interface ITableColumns {
  key: string; // Clave de la propiedad del objeto de datos
  label: string; // Etiqueta del encabezado de la columna
  width?: string | number; // Ancho de la columna
  type?: "date" | "date-time" | "currency" | "boolean" | "status" | "state";
  transform?: (value: any, item: any) => any; // Transformador de valor personalizado
}
```

#### Botones de Acción

```typescript
interface ITableActions {
  label: string; // Etiqueta del botón
  handler: (item: any) => void; // Manejador del clic
  show?: (item: any) => boolean; // Visualización condicional
}
```

### Internacionalización

El componente incluye soporte completo para internacionalización usando @ngx-translate/core.

#### Configuración Básica

1. Importa el módulo de traducciones en tu módulo principal:

```typescript
import { TableTranslationsModule } from "ng-table-pg";

@NgModule({
  imports: [TableTranslationsModule.forRoot()],
})
export class AppModule {}
```

#### Configuración Personalizada

Puedes personalizar la ubicación de los archivos de traducción:

```typescript
@NgModule({
  imports: [
    TableTranslationsModule.forRoot({
      path: "./assets/translations/", // Ruta personalizada
      prefix: "./i18n-", // Prefijo personalizado
      suffix: ".json", // Sufijo personalizado
    }),
  ],
})
export class AppModule {}
```

#### Estructura de Traducciones

Los archivos de traducción deben seguir esta estructura:

```json
{
  "TABLE": {
    "SEARCH": "Buscar...",
    "FILTERS": "Filtros",
    "SHOWING": "Mostrando",
    "OF": "de",
    "RESULTS": "resultados",
    "EXPORT_CSV": "Exportar CSV",
    "EXPORT_EXCEL": "Exportar Excel",
    "ACTIONS": "Acciones",
    "DRAG_MODE": {
      "TITLE": "Modo de Reordenamiento",
      "ALL_PAGES": "Todas las Páginas",
      "DROP_HERE": "Soltar aquí para mover a la página {{page}}",
      "CANCEL": "Cancelar Reordenamiento",
      "SAVE": "Guardar Orden"
    }
  },
  "STATUS": {
    "ACTIVE": "Activo",
    "INACTIVE": "Inactivo",
    "PARTIAL": "Parcial",
    "REJECTED": "Rechazado",
    "PENDING": "Pendiente",
    "COMPLETED": "Completado",
    "IN_PROGRESS": "En Progreso"
  }
}
```

La librería incluye traducciones predeterminadas en inglés y español. Para usar un idioma diferente, simplemente proporciona los archivos de traducción correspondientes en tu aplicación.

## Contribuir

1. Haz un fork del repositorio
2. Crea tu rama de características (`git checkout -b feature/CaracteristicaIncreible`)
3. Haz commit de tus cambios (`git commit -m 'Añadir alguna CaracteristicaIncreible'`)
4. Haz push a la rama (`git push origin feature/CaracteristicaIncreible`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## Soporte

Para soporte, por favor abre un issue en el repositorio de GitHub o contacta directamente al autor.

## Recursos Adicionales

- [Documentación de Angular](https://angular.dev/)
- [Documentación de Angular CLI](https://angular.dev/tools/cli)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)

## Changelog

### v0.1.0 - Responsive Design Update 🎉

#### ✨ Nuevas Funcionalidades

- **Sistema Responsive Completo**: Adaptación automática a diferentes tamaños de pantalla
- **Scroll Horizontal Mejorado**: Con indicadores visuales y scroll suave personalizado
- **Prioridades de Columnas**: Control granular de qué columnas mostrar en cada dispositivo (Priority 1, 2, 3)
- **Sticky Header**: Header fijo al hacer scroll con backdrop-filter
- **Modo Compacto**: Optimizado para pantallas pequeñas
- **Indicadores de Scroll**: Señales visuales para scroll horizontal
- **Breakpoints Responsive**: Sistema de media queries para móvil, tablet y desktop

#### 🔧 Nuevas Propiedades

- `responsive` (boolean): Habilita el modo responsive
- `stickyHeader` (boolean): Header fijo al hacer scroll
- `compactMode` (boolean): Modo compacto para pantallas pequeñas
- `horizontalScroll` (boolean): Permite scroll horizontal
- `minTableWidth` (string): Ancho mínimo de la tabla
- `maxTableHeight` (string): Altura máxima con scroll vertical
- `showScrollIndicators` (boolean): Muestra indicadores de scroll

#### 🎨 Mejoras de Estilos

- Scrollbar personalizada para WebKit
- Indicadores de scroll con gradientes
- Contenedor con overflow controlado
- Celdas con manejo de contenido truncado
- Sistema de prioridades CSS

#### 🔄 Interfaces Actualizadas

- Nuevas propiedades en `ITableColumns`: `priority`, `expandable`, `sortable`, `resizable`, `minWidth`, `maxWidth`
- Compatibilidad hacia atrás mantenida

#### 📱 Responsive Breakpoints

- **Móvil** (< 640px): Oculta columnas priority 2 y 3
- **Tablet** (< 768px): Oculta columnas priority 3
- **Desktop** (≥ 768px): Muestra todas las columnas

#### 🐛 Correcciones

- Mejorado el manejo de scroll horizontal
- Optimizado el rendimiento en dispositivos móviles
- Corregidos problemas de overflow en contenedores pequeños

### v0.0.14

- ✨ **Estilos auto-contenidos**: Eliminada la dependencia de Tailwind CSS
- 🔧 **Mejor compatibilidad**: Funciona con cualquier proyecto Angular
- 📦 **Tamaño optimizado**: Solo incluye CSS necesario
- 🐛 **Correcciones**: Skeleton loader mejorado

### Versiones anteriores

- Requerían Tailwind CSS en el proyecto consumidor
- Dependencias externas para estilos
