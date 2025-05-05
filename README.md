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
