# Visor LPS · UEB003-CED

Visor IFC para registro del parámetro LPS en campo desde cualquier dispositivo.

## Estructura del repositorio

```
visor-lps/
├── visor_lps.html              ← el visor (este archivo)
├── UEB003-CED-...-EST-0001.ifc ← tus modelos IFC aquí
├── UEB003-CED-...-SAN-0001.ifc
└── README.md
```

## Cómo configurar los IFCs precargados

Abre `visor_lps.html` y edita el bloque al inicio del script:

```javascript
const IFC_PRELOADED = [
  {
    label: 'EST — Estructural',
    url: 'https://raw.githubusercontent.com/TU-USUARIO/visor-lps/main/UEB003-CED-GEN-000-MOD-EST-0001.ifc'
  },
  {
    label: 'SAN — Sanitarias',
    url: 'https://raw.githubusercontent.com/TU-USUARIO/visor-lps/main/UEB003-CED-GEN-000-MOD-SAN-0001.ifc'
  },
];
```

Reemplaza `TU-USUARIO` con tu usuario de GitHub y el nombre de tu repo.

## Publicar en GitHub Pages

1. Crear repo en github.com (público o privado con Pages habilitado)
2. Subir `visor_lps.html` + los archivos `.ifc`
3. Settings → Pages → Branch: main → Save
4. URL: `https://TU-USUARIO.github.io/visor-lps/visor_lps.html`

⚠️ **Límite de GitHub**: archivos hasta 100 MB por archivo, 1 GB total por repo.
Para IFCs grandes, considera usar Git LFS (gratuito hasta 1 GB).

## Cómo usar en campo

1. Abre la URL en Chrome (PC, tablet o celular)
2. Los modelos precargados aparecen como botones en la pantalla inicial
3. O arrastra/sube un IFC manualmente
4. Filtra por **Nivel** y **Sistema**
5. Toca un elemento → escribe en el campo **SEM····** (ej: `37`, `38A`)
6. Al salir del campo el elemento se pinta en verde automáticamente
7. Agrega nota si necesitas (restricción, responsable, etc.)
8. Exporta CSV cuando termines el recorrido

## Exportar IFC desde Revit (configuración óptima)

- Esquema: **IFC2X3** (Coordination View 2.0)
- Activar: "Export user defined property sets"
- Asegurarse que el `.pset` incluya:
  - `Pset_BIM_Construction` → `LPS`, `EJECUTADO`
  - `Pset_BIM_Data` → `NIVEL`
  - `Pset_BIM_General` → `CODIGO`, `PARTIDA`

## CSV para Dynamo

Columnas exportadas:
| GlobalId | Nombre | LPS | EJECUTADO | Nivel | Sistema | Codigo | Partida | Nota |
|---|---|---|---|---|---|---|---|---|
| `2yP9W...` | `UEB_COLUMNA...` | `SEM37` | `.T.` | `AZOTEA` | `EST` | `C.20.09.01` | `CONCRETO...` | `` |

En Dynamo: leer CSV → buscar por `GlobalId` → escribir `LPS` y `EJECUTADO` al parámetro compartido.
