# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-07-10 - Scrollbar Horizontal Mejorado y Responsive Inteligente 🚀

### ✨ Agregado

#### Sistema de Scrollbar Horizontal Avanzado

- **Nuevas propiedades de configuración**:
  - `alwaysShowScrollbar` (boolean): Fuerza la visibilidad del scrollbar horizontal
  - `scrollbarStyle` ('default' | 'prominent' | 'minimal'): Estilos personalizables del scrollbar
  - `hideColumnsOnResize` (boolean): Control del comportamiento responsive

#### Estilos de Scrollbar Personalizables

- **Scrollbar Default**: 14px, gris, diseño estándar mejorado
- **Scrollbar Prominent**: 18px, azul índigo, máxima visibilidad
- **Scrollbar Minimal**: 8px, semi-transparente, diseño discreto
- **Estados interactivos**: Hover y active states para mejor UX
- **Compatibilidad Firefox**: Usando `scrollbar-width` y `scrollbar-color`

#### Responsive Inteligente

- **Modo Scroll Horizontal** (default): Mantiene todas las columnas visibles con scroll automático
- **Modo Ocultar Columnas** (opcional): Comportamiento clásico de ocultar columnas por prioridad
- **Detección automática**: Aplica scroll solo cuando es necesario (>6 columnas o anchos específicos)
- **Cálculo dinámico**: Ancho mínimo calculado automáticamente basado en columnas

### 🎨 Mejorado

#### Comportamiento Responsive Optimizado

- **Desktop**: 
  - Pocas columnas: Se extiende naturalmente sin scroll
  - Muchas columnas: Scroll horizontal automático preservando diseño
- **Mobile/Tablet**: Scroll horizontal siempre activo para mantener diseño intacto
- **Sin columnas rotas**: Las columnas mantienen sus anchos configurados

#### Experiencia de Usuario

- **Scroll suave**: `-webkit-overflow-scrolling: touch` para móviles
- **Indicadores visuales**: Gradientes que muestran contenido oculto
- **Resize listener**: Responsive dinámico al cambiar tamaño de ventana
- **Debug mejorado**: Logs detallados del estado responsive

#### API y Configuración

- **Backward compatible**: Todos los cambios mantienen compatibilidad
- **Configuración granular**: Control total sobre el comportamiento del scrollbar
- **Estilos CSS optimizados**: Mayor especificidad y rendimiento

### 🔧 Cambiado

#### Arquitectura CSS

- **Clases condicionales**: `.scroll-mode` vs `.hide-columns-mode`
- **Especificidad mejorada**: Uso de `ng-table-pg` como prefijo en todos los estilos
- **Media queries optimizados**: Breakpoints más consistentes (640px, 768px)

#### Lógica de Renderizado

- **Cálculo inteligente**: `shouldUseMinWidth()` determina cuándo aplicar restricciones
- **Estilos dinámicos**: `getTableStyles()` aplica estilos según contexto
- **Listener de resize**: Manejo dinámico de cambios de ventana

### 📚 Documentación

#### Nuevos Ejemplos

- **Configuración de scrollbar**: Ejemplos de todos los estilos disponibles
- **Modos responsive**: Comparación entre scroll y ocultar columnas
- **Casos de uso**: Tabla con pocas vs muchas columnas

#### API Actualizada

- Documentación completa de nuevas propiedades
- Ejemplos de configuración avanzada
- Guía de migración para usuarios existentes

### 🐛 Fixes Incluidos

- **Paginación corregida**: Fix del bug de itemsPerPage (de v0.1.8)
- **Conversión de tipos**: Manejo robusto de string/number en paginación
- **Consistencia CSS**: Unificación de breakpoints entre archivos

## [0.1.8] - 2025-07-10 - Corrección Crítica de Paginación 🐛

### 🐛 Corregido

#### Problema de Paginación con itemsPerPage

- **Bug crítico corregido**: Solucionado el problema donde al cambiar la cantidad de elementos por página y luego cambiar de página, se seguían mostrando más registros de los configurados
- **Conversión de tipos**: Implementada conversión explícita de string a number para `itemsPerPage` en todas las operaciones de paginación
- **Métodos afectados corregidos**:
  - `updatePagination()`: Ahora convierte `itemsPerPage` a number antes de calcular índices
  - `onItemsPerPageChange()`: Asegura que `itemsPerPage` sea tratado como number
  - `getTotalPages()`: Corregido cálculo con conversión numérica
  - `handlePageDrop()`, `onDrop()`, `handleDrop()`: Actualizados todos los métodos de drag-and-drop

### 🧪 Mejorado

#### Testing y Validación

- **Tests unitarios agregados**: Nuevos tests específicos para validar el comportamiento de paginación
- **Test de conversión de tipos**: Verificación de que `itemsPerPage` como string se convierte correctamente
- **Test de cambio de página**: Validación de que el tamaño de página se mantiene al navegar entre páginas
- **Validación manual**: Test JavaScript independiente que confirma la corrección del bug

#### Robustez del Componente

- **Mejor manejo de tipos**: El componente ahora maneja correctamente valores string y number para `itemsPerPage`
- **Consistencia en cálculos**: Todos los cálculos relacionados con paginación usan valores numéricos
- **Compatibilidad hacia atrás**: Los cambios no afectan la API existente

### 📝 Detalles Técnicos

#### Antes (Problemático):
```typescript
const startIndex = (this.currentPage - 1) * this.itemsPerPage; // Si itemsPerPage era "5", esto causaba problemas
```

#### Después (Corregido):
```typescript
const itemsPerPageNumber = Number(this.itemsPerPage);
const startIndex = (this.currentPage - 1) * itemsPerPageNumber; // Ahora siempre es numérico
```

#### Ejemplo del Problema:
- Página 1 con 5 elementos por página: Mostraba correctamente 5 elementos
- Cambiar a página 2: Mostraba incorrectamente 20 elementos en lugar de 5
- **Causa**: Operación `"5" * 4 = "5555"` en lugar de `5 * 4 = 20`

## [0.1.4] - 2025-06-06 - Correcciones Completas de Scroll y Paginación 🎯

### 🐛 Corregido

#### Problemas Críticos de Scroll

- **Scroll horizontal controlado**: El scroll horizontal ahora aparece SOLO en la tabla, no en toda la página
- **Altura de tabla corregida**: La tabla ahora tiene una altura máxima controlada (70vh) para evitar desbordamiento
- **Contenedor optimizado**: Corregido el problema donde el contenedor causaba scroll en toda la página
- **Overflow inteligente**: Implementado sistema de overflow que mantiene el scroll dentro del componente

#### Estilos de Paginación Mejorados

- **Diseño coherente**: Los estilos del footer y paginación ahora son coherentes con el diseño de la tabla
- **Botones uniformes**: Todos los botones de paginación usan la clase `.pagination-button` con estilos consistentes
- **Selector mejorado**: El selector de elementos por página tiene estilos coherentes con los botones
- **Información de paginación**: Mejor presentación de la información "Mostrando X de Y resultados"

#### Scrollbar Personalizada

- **Scrollbar mejorada**: Scrollbar más visible con 12px de altura/ancho
- **Esquinas redondeadas**: Mejor apariencia visual con bordes redondeados
- **Colores coherentes**: Colores que combinan con el diseño general de la tabla
- **Hover effects**: Efectos de hover en la scrollbar para mejor UX

### 🎨 Mejorado

#### Experiencia de Usuario

- **Scroll contenido**: El scroll horizontal ya no afecta toda la página web
- **Altura controlada**: La tabla no se desborda verticalmente fuera de la pantalla
- **Navegación mejorada**: Mejor experiencia de navegación con scroll controlado
- **Indicadores de scroll**: Indicadores visuales más prominentes (30px de ancho)

#### Estilos CSS Refinados

- **Contenedor principal**: `max-height: 70vh` para desktop, `60vh` para móvil
- **Tabla responsive**: `table-layout: fixed` para mejor control de columnas
- **Celdas optimizadas**: Mejor manejo de `min-width` y `max-width`
- **Header sticky**: Mejor transparencia y backdrop-filter

#### Paginación Coherente

- **Botones consistentes**: Altura uniforme de 36px para todos los botones
- **Estados claros**: Estados activo, hover y disabled bien definidos
- **Espaciado mejorado**: Mejor distribución del espacio en la paginación
- **Responsive móvil**: Mejor adaptación en pantallas pequeñas

### 🔧 Cambiado

#### Arquitectura CSS

- **Scrollbar nativa**: Uso de scrollbar nativa personalizada en lugar de soluciones JavaScript
- **Contenedor controlado**: El contenedor de tabla ahora controla completamente el overflow
- **Clases CSS**: Nuevas clases `.pagination-button`, `.pagination-info` para consistencia

#### Template HTML

- **Clases simplificadas**: Uso de clases CSS dedicadas en lugar de múltiples clases inline
- **Estructura mejorada**: Mejor estructura HTML para la paginación
- **Estados dinámicos**: Mejor manejo de estados activos y disabled

### 📚 Documentación

#### Correcciones Técnicas

- **Scroll horizontal**: Documentado cómo el scroll se mantiene dentro del componente
- **Altura de tabla**: Explicado el sistema de altura máxima controlada
- **Estilos coherentes**: Documentados los nuevos estilos de paginación

## [0.1.3] - 2025-06-06 - Correcciones Críticas de Responsive 🔧

### 🐛 Corregido

#### Problemas de Overflow y Desbordamiento

- **Overflow corregido**: Solucionado el problema de desbordamiento horizontal de la tabla
- **Elementos cortados**: Corregido el problema donde el último registro se veía cortado por la mitad
- **Paginación mejorada**: La paginación ahora usa la clase CSS `pagination-container` para evitar cortes
- **Scroll vertical**: Cambiado `overflow-y: hidden` a `overflow-y: visible` para evitar cortes de contenido

#### Estilos CSS Mejorados

- **Contenedor de tabla**: Agregado `width: 100%`, `max-width: 100%` y `box-sizing: border-box`
- **Altura máxima controlada**: Nueva clase `.with-max-height` para control opcional de altura
- **Celdas optimizadas**: Mejor manejo de `vertical-align`, `padding` y `text-overflow`
- **Header sticky mejorado**: Agregado `backdrop-filter` para mejor legibilidad
- **Responsive móvil**: Reducido `min-width` a 600px para móviles manteniendo funcionalidad

#### Template HTML Optimizado

- **Paginación**: Aplicada clase `pagination-container` para evitar cortes
- **Botones deshabilitados**: Agregados estilos `disabled:opacity-50` y `disabled:cursor-not-allowed`
- **Contenido expandible**: Mejor manejo de contenido con `max-width: none` para celdas expandibles
- **Indicadores de scroll**: Mejorados los indicadores visuales de scroll horizontal

### 🎨 Mejorado

#### Experiencia de Usuario

- **Scroll suave**: Mejor experiencia de scroll horizontal y vertical
- **Visibilidad completa**: Todos los elementos de la tabla son completamente visibles
- **Responsive real**: La tabla ahora es verdaderamente responsive sin elementos cortados
- **Paginación robusta**: La paginación mantiene su altura mínima y no se corta

#### Compatibilidad

- **Compatibilidad hacia atrás**: Todos los cambios son compatibles con versiones anteriores
- **Configuración automática**: Las mejoras se aplican automáticamente sin cambios de código

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
