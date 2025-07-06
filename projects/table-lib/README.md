# NgTablePg

Un componente de tabla potente y flexible para aplicaciones Angular con funciones integradas de ordenamiento, filtrado, paginación y arrastrar y soltar.

## Autor

- **Nombre:** Alejandro Pérez Granado
- **Redes sociales:** alejoperez.dev
- **GitHub:** [@alejandr0pg](https://github.com/alejandr0pg)

## Características

- ✨ Diseño responsive con estilos CSS compilados (sin dependencia de Tailwind)
- 🔍 Funcionalidad de búsqueda
- 🔄 Ordenamiento de columnas
- 📊 Filtros personalizados
- 📱 Paginación
- 📎 Reordenamiento de filas con arrastrar y soltar
- 📥 Exportación a CSV y Excel
- 🎨 Estilos auto-contenidos (no requiere Tailwind CSS en el proyecto consumidor)
- 🌐 Soporte para internacionalización
- 💫 Estado de carga con skeleton loader
- 🛠️ Botones de acción personalizados
- 📋 Plantillas de columnas personalizadas
- ✅ **Responsive Design**: Adaptación automática a diferentes tamaños de pantalla
- ✅ **Scroll Horizontal Mejorado**: Con indicadores visuales y scroll suave
- ✅ **Prioridades de Columnas**: Control granular de qué columnas mostrar en cada dispositivo
- ✅ **Drag & Drop**: Reordenamiento de filas con soporte cross-page
- ✅ **Paginación Avanzada**: Con drag & drop entre páginas
- ✅ **Filtros**: Sistema de filtros flexible y personalizable
- ✅ **Búsqueda**: Búsqueda global en tiempo real
- ✅ **Exportación**: CSV y Excel con traducciones
- ✅ **Skeleton Loading**: Estados de carga elegantes
- ✅ **Internacionalización**: Soporte completo para i18n
- ✅ **TypeScript**: Completamente tipado

## Instalación

```bash
npm install ng-table-pg
```

### Dependencias

Instala las dependencias requeridas:

```bash
npm install @angular/cdk file-saver xlsx @ngx-translate/core
```

## ⚠️ Importante: Estilos CSS

**A partir de la versión 0.0.10, la librería incluye todos los estilos CSS compilados internamente.**

- ✅ **NO necesitas** instalar Tailwind CSS en tu proyecto
- ✅ **NO necesitas** configurar Tailwind CSS
- ✅ Los estilos se incluyen automáticamente con el componente

### Migración desde versiones anteriores

Si estabas usando una versión anterior que requería Tailwind CSS:

1. Puedes **remover Tailwind CSS** de tu proyecto si solo lo usabas para ng-table-pg
2. Los estilos seguirán funcionando exactamente igual
3. No necesitas cambiar nada en tu código

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

Estructura requerida para las traducciones:

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
    "ACTIONS": "Acciones"
  }
}
```

## Arquitectura de Estilos

### Estilos Auto-Contenidos

La librería utiliza un enfoque de **estilos auto-contenidos**:

- **CSS Compilado**: Todos los estilos de Tailwind necesarios están pre-compilados
- **Sin Dependencias**: No requiere Tailwind CSS en el proyecto consumidor
- **Optimizado**: Solo incluye las clases CSS que realmente se usan
- **Compatible**: Funciona con cualquier framework CSS (Bootstrap, Material, etc.)

### Personalización de Estilos

Si necesitas personalizar los estilos:

```scss
// En tu archivo de estilos globales
ng-table-pg {
  // Sobrescribe estilos específicos
  .custom-table-header {
    background-color: your-color;
  }

  // Usa !important si es necesario para sobrescribir
  .custom-button {
    background-color: your-color !important;
  }
}
```

## Changelog

### v0.0.10

- ✨ **Estilos auto-contenidos**: Eliminada la dependencia de Tailwind CSS
- 🔧 **Mejor compatibilidad**: Funciona con cualquier proyecto Angular
- 📦 **Tamaño optimizado**: Solo incluye CSS necesario
- 🐛 **Correcciones**: Skeleton loader mejorado

### Versiones anteriores

- Requerían Tailwind CSS en el proyecto consumidor
- Dependencias externas para estilos

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
- [Documentación de Angular CDK](https://material.angular.io/cdk/categories)

---

**¡Gracias por usar ng-table-pg!** 🚀

## Uso Básico

```typescript
import { TableComponent } from "ng-table-pg";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [TableComponent],
  template: ` <ng-table-pg [data]="data" [columns]="columns" [actions]="actions" [loading]="loading" [responsive]="true" [compactMode]="false" [stickyHeader]="true" [showScrollIndicators]="true" [minTableWidth]="'800px'" [horizontalScroll]="true"></ng-table-pg> `,
})
export class ExampleComponent {
  data = [
    { id: 1, name: "John Doe", email: "john@example.com", status: true },
    // ... más datos
  ];

  columns: ITableColumns[] = [
    {
      key: "id",
      label: "ID",
      width: 80,
      priority: 1, // Siempre visible
      sortable: true,
    },
    {
      key: "name",
      label: "Nombre",
      priority: 1, // Siempre visible
      expandable: true, // Permite expansión del contenido
      sortable: true,
      minWidth: 150,
    },
    {
      key: "email",
      label: "Email",
      priority: 2, // Ocultar en móvil
      sortable: true,
      minWidth: 200,
    },
    {
      key: "status",
      label: "Estado",
      type: "status",
      priority: 1, // Siempre visible
      sortable: true,
      width: 100,
    },
  ];

  actions: ITableActions[] = [
    {
      label: "Editar",
      handler: (item) => this.edit(item),
      show: (item) => item.canEdit,
    },
    {
      label: "Eliminar",
      handler: (item) => this.delete(item),
    },
  ];
}
```

## Propiedades de Configuración

### Propiedades Principales

| Propiedad | Tipo              | Defecto | Descripción                 |
| --------- | ----------------- | ------- | --------------------------- |
| `data`    | `any[]`           | `[]`    | Datos a mostrar en la tabla |
| `columns` | `ITableColumns[]` | `[]`    | Configuración de columnas   |
| `actions` | `ITableActions[]` | `[]`    | Acciones por fila           |
| `loading` | `boolean`         | `false` | Estado de carga             |

### Propiedades Responsive

| Propiedad              | Tipo      | Defecto   | Descripción                           |
| ---------------------- | --------- | --------- | ------------------------------------- |
| `responsive`           | `boolean` | `true`    | Habilita el modo responsive           |
| `stickyHeader`         | `boolean` | `false`   | Header fijo al hacer scroll           |
| `compactMode`          | `boolean` | `false`   | Modo compacto para pantallas pequeñas |
| `horizontalScroll`     | `boolean` | `true`    | Permite scroll horizontal             |
| `minTableWidth`        | `string`  | `'800px'` | Ancho mínimo de la tabla              |
| `maxTableHeight`       | `string`  | `'none'`  | Altura máxima con scroll vertical     |
| `showScrollIndicators` | `boolean` | `true`    | Muestra indicadores de scroll         |

### Configuración de Columnas

```typescript
interface ITableColumns {
  key: string; // Clave del dato
  label: string; // Etiqueta de la columna
  type?: string; // Tipo de dato (status, date, currency, etc.)
  transform?: (value: any, row: any) => any; // Función de transformación
  width?: number | string; // Ancho de la columna

  // Nuevas propiedades responsive
  priority?: 1 | 2 | 3; // Prioridad de visualización
  expandable?: boolean; // Permite expansión del contenido
  sortable?: boolean; // Columna ordenable
  resizable?: boolean; // Columna redimensionable
  minWidth?: number | string; // Ancho mínimo
  maxWidth?: number | string; // Ancho máximo
}
```

### Prioridades de Columnas

- **Priority 1**: Siempre visible (columnas esenciales)
- **Priority 2**: Oculta en móvil (< 640px)
- **Priority 3**: Oculta en tablet y móvil (< 768px)

## Ejemplos de Uso

### Tabla Responsive Básica

```typescript
columns: ITableColumns[] = [
  {
    key: 'id',
    label: 'ID',
    width: 60,
    priority: 1
  },
  {
    key: 'name',
    label: 'Nombre',
    priority: 1,
    expandable: true,
    minWidth: 150
  },
  {
    key: 'email',
    label: 'Email',
    priority: 2, // Se oculta en móvil
    minWidth: 200
  },
  {
    key: 'phone',
    label: 'Teléfono',
    priority: 3, // Se oculta en tablet y móvil
    minWidth: 120
  }
];
```

### Tabla con Scroll Horizontal Controlado

```html
<ng-table-pg [data]="data" [columns]="columns" [responsive]="true" [horizontalScroll]="true" [showScrollIndicators]="true" [minTableWidth]="'1200px'" [maxTableHeight]="'400px'"></ng-table-pg>
```

### Tabla Compacta para Móviles

```html
<ng-table-pg [data]="data" [columns]="columns" [compactMode]="true" [stickyHeader]="true" [itemsPerPage]="5"></ng-table-pg>
```

## Tipos de Datos Soportados

La tabla soporta diferentes tipos de datos con formateo automático:

- `status`: Estados con badges de colores
- `date`: Fechas formateadas
- `date-time`: Fecha y hora
- `currency`: Moneda con formato
- `boolean`: Sí/No
- `json`: JSON formateado
- `html`: HTML renderizado
- `wallet`: Direcciones de wallet truncadas

## Responsive Breakpoints

```scss
// Móvil
@media (max-width: 640px) {
  .col-priority-2,
  .col-priority-3 {
    display: none;
  }
}

// Tablet
@media (max-width: 768px) {
  .col-priority-3 {
    display: none;
  }
}
```

## Personalización de Estilos

```scss
// Personalizar scroll indicators
ng-table-pg .scroll-indicator {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.1), transparent);
}

// Personalizar tabla compacta
ng-table-pg .responsive-table.compact {
  font-size: 0.8rem;
}

// Personalizar header sticky
ng-table-pg .sticky-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}
```

## Migración desde Versiones Anteriores

### Cambios en v2.0

1. **Nuevas propiedades de columna**: `priority`, `expandable`, `sortable`, etc.
2. **Propiedades responsive**: Control granular de responsividad
3. **Scroll indicators**: Indicadores visuales de scroll
4. **Mejoras de rendimiento**: Optimizaciones en el scroll horizontal

### Actualizar Configuración Existente

```typescript
// Antes (v1.x)
columns = [{ key: "name", label: "Nombre", width: 200 }];

// Después (v2.x)
columns = [
  {
    key: "name",
    label: "Nombre",
    width: 200,
    priority: 1, // Nueva
    expandable: true, // Nueva
    sortable: true, // Nueva
  },
];
```

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

MIT License
