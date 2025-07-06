# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-01-XX - Responsive Design Update 🎉

### ✨ Agregado

#### Sistema Responsive Completo

- **Adaptación automática**: La tabla se adapta automáticamente a diferentes tamaños de pantalla
- **Prioridades de columnas**: Control granular de qué columnas mostrar en cada dispositivo
  - Priority 1: Siempre visible (columnas esenciales)
  - Priority 2: Oculta en móvil (< 640px)
  - Priority 3: Oculta en tablet y móvil (< 768px)
- **Breakpoints responsive**: Sistema de media queries optimizado

#### Scroll Horizontal Mejorado

- **Indicadores visuales**: Señales visuales para indicar scroll disponible
- **Scroll suave**: Experiencia de scroll optimizada
- **Scrollbar personalizada**: Diseño personalizado para navegadores WebKit
- **Control de overflow**: Manejo inteligente del contenido que se desborda

#### Nuevas Propiedades de Configuración

- `responsive` (boolean, default: true): Habilita el modo responsive
- `stickyHeader` (boolean, default: false): Header fijo al hacer scroll
- `compactMode` (boolean, default: false): Modo compacto para pantallas pequeñas
- `horizontalScroll` (boolean, default: true): Permite scroll horizontal
- `minTableWidth` (string, default: '800px'): Ancho mínimo de la tabla
- `maxTableHeight` (string, default: 'none'): Altura máxima con scroll vertical
- `showScrollIndicators` (boolean, default: true): Muestra indicadores de scroll

#### Interfaces Actualizadas

- **ITableColumns** expandida con nuevas propiedades:
  - `priority?: 1 | 2 | 3`: Prioridad de visualización
  - `expandable?: boolean`: Permite expansión del contenido
  - `sortable?: boolean`: Columna ordenable
  - `resizable?: boolean`: Columna redimensionable
  - `minWidth?: number | string`: Ancho mínimo
  - `maxWidth?: number | string`: Ancho máximo

### 🎨 Mejorado

#### Estilos CSS

- **Contenedor mejorado**: Mejor manejo de overflow y scroll
- **Header sticky**: Header fijo con backdrop-filter para mejor legibilidad
- **Indicadores de scroll**: Gradientes visuales para indicar scroll disponible
- **Celdas optimizadas**: Manejo inteligente de contenido truncado
- **Modo compacto**: Estilos optimizados para pantallas pequeñas

#### Funcionalidad JavaScript

- **Listeners de scroll**: Manejo dinámico de eventos de scroll
- **Métodos helper**: Nuevos métodos para generar clases CSS dinámicas
- **Optimización de rendimiento**: Mejor manejo de eventos y actualizaciones

### 🔧 Cambiado

#### Compatibilidad

- **Mantenida compatibilidad hacia atrás**: Todas las propiedades existentes funcionan igual
- **Nuevas propiedades opcionales**: No se requieren cambios en implementaciones existentes
- **Mejoras automáticas**: Las tablas existentes obtienen mejoras responsive automáticamente

### 📚 Documentación

#### README actualizado

- **Ejemplos de uso**: Nuevos ejemplos con funcionalidades responsive
- **Tabla de propiedades**: Documentación completa de todas las propiedades
- **Guía de migración**: Instrucciones para actualizar desde versiones anteriores
- **Breakpoints**: Documentación de los breakpoints responsive

#### Ejemplos de código

- **Configuración básica**: Ejemplo de uso básico con responsive
- **Configuración avanzada**: Ejemplos de personalización completa
- **Casos de uso**: Diferentes escenarios de implementación

## [0.0.14] - 2024-01-XX

### ✨ Agregado

- **Estilos auto-contenidos**: Eliminada la dependencia de Tailwind CSS
- **Mejor compatibilidad**: Funciona con cualquier proyecto Angular sin configuración adicional

### 🎨 Mejorado

- **Tamaño optimizado**: Solo incluye CSS necesario
- **Skeleton loader**: Mejorado el estado de carga

### 🔧 Cambiado

- **Dependencias**: Eliminada la dependencia externa de Tailwind CSS
- **Distribución**: Los estilos ahora se incluyen automáticamente

## [0.0.13] - 2024-01-XX

### ✨ Agregado

- Funcionalidad básica de tabla
- Drag & drop para reordenamiento
- Paginación
- Filtros
- Búsqueda
- Exportación CSV/Excel
- Internacionalización

### 🎨 Mejorado

- Estilos con Tailwind CSS
- Skeleton loader
- Botones de acción personalizados

## [Unreleased]

### 🚀 Próximas funcionalidades

- Redimensionamiento de columnas
- Filtros avanzados por columna
- Temas personalizables
- Modo oscuro
- Virtualización para grandes datasets
- Edición inline de celdas

---

## Tipos de cambios

- **✨ Agregado** para nuevas funcionalidades
- **🎨 Mejorado** para cambios en funcionalidades existentes
- **🔧 Cambiado** para cambios que pueden afectar compatibilidad
- **🐛 Corregido** para corrección de bugs
- **🚀 Próximas funcionalidades** para funcionalidades planificadas
- **📚 Documentación** para cambios en documentación
- **🔒 Seguridad** para vulnerabilidades corregidas

## Enlaces

- [Repositorio](https://github.com/alejandr0pg/ng-table-pg)
- [Issues](https://github.com/alejandr0pg/ng-table-pg/issues)
- [NPM Package](https://www.npmjs.com/package/ng-table-pg)
