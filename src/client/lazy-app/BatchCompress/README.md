# BatchCompress Component Structure

Componente de compresión por lote con arquitectura modular, siguiendo el patrón de organización de Squoosh.

## Estructura de Directorios

```
BatchCompress/
├── index.tsx              # Componente principal - lógica de procesamiento
├── style.css              # Estilos del contenedor principal
├── utils.ts               # Funciones helper compartidas
├── BatchControls/         # Panel de configuración
│   ├── index.tsx
│   └── style.css
├── BatchSummary/          # Estadísticas totales
│   ├── index.tsx
│   └── style.css
└── FileList/              # Tabla de archivos procesados
    ├── index.tsx
    └── style.css
```

## Componentes

### `index.tsx` (Componente Principal)

- **Responsabilidad**: Orquestación y lógica de procesamiento
- **Funciones clave**:
  - `decodeImage()` - Decodificación de imágenes en múltiples formatos
  - `compressImage()` - Compresión con configuración seleccionada
  - `processAllImages()` - Procesamiento secuencial con tracking de progreso
  - `downloadAll()` - Descarga masiva de archivos procesados

### `BatchControls/`

- **Responsabilidad**: UI de configuración y controles de acción
- **Incluye**:
  - Selector de formato de salida
  - Opciones del encoder seleccionado
  - Botones de procesar y descargar

### `BatchSummary/`

- **Responsabilidad**: Visualización de estadísticas
- **Muestra**:
  - Tamaño original total
  - Tamaño comprimido total
  - Porcentaje de ahorro

### `FileList/`

- **Responsabilidad**: Lista detallada de archivos
- **Features**:
  - Tabla con estado de cada archivo
  - Información de tamaños individuales
  - Enlaces de descarga por archivo
  - Indicadores visuales de estado (pendiente, procesando, completado, error)

### `utils.ts`

- **Responsabilidad**: Funciones helper reutilizables
- **Exporta**:
  - `formatBytes()` - Formateo de tamaños de archivo
  - `calculateSavings()` - Cálculo de porcentaje de ahorro

## Flujo de Datos

```
index.tsx (Estado global)
    ↓
    ├─→ BatchControls (Config + Actions)
    ├─→ BatchSummary (Stats)
    └─→ FileList (Details)
```

## Estado del Componente

```typescript
interface State {
  loading: boolean;
  progress: number;
  processedFiles: ProcessedFile[];
  encoderState: EncoderState | null;
  encoderType: EncoderType;
  isProcessing: boolean;
}
```

## Tipos Compartidos

```typescript
interface ProcessedFile {
  originalFile: File;
  originalSize: number;
  compressedBlob: Blob | null;
  compressedSize: number | null;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
  downloadUrl?: string;
  downloadFilename?: string;
}
```

## Convenciones de Estilo

- Usa CSS Modules con naming convention `.componentName`
- Variables CSS custom properties heredadas de Squoosh:
  - `--pink`, `--hot-pink` - Colores primarios
  - `--blue` - Color secundario
  - `--off-black`, `--dark-gray` - Fondos
  - `--white`, `--less-light-gray` - Textos
- Grid layout para estructura principal
- Responsive con breakpoints a 768px y 600px

## Integración

El componente se integra con:

- `WorkerBridge` - Para procesamiento de imágenes en workers
- `encoderMap` - Para configuración de codecs
- `feature-meta` - Para tipos de encoders y opciones
