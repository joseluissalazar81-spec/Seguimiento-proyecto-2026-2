# Seguimiento e-Learning UST 2026-2

Dashboard de seguimiento del proyecto 2026-2, separado del repo de 2026-1.

## Qué contiene

- `index.html`: el dashboard 2026-2 (idéntico al que ya vivía en `seguimiento-proyecto-2026-1/2026-2/`).
  Sigue leyendo los datos en vivo desde:
  `https://raw.githubusercontent.com/joseluissalazar81-spec/seguimiento-proyecto-2026-1/master/data/seguimiento-2026-2.csv`
  **No se cambió esta URL** — el flujo de Power Automate que actualiza ese CSV cada hora sigue
  funcionando exactamente igual, sin que tengas que tocar nada ahí.
- `manifest.json`, `sw.js`, `icons/`: PWA (idénticos, solo se actualizó el nombre en el manifest a "2026-2").
- `reportes/`: informes HTML y PDFs de programas que el dashboard enlaza.
- `vercel.json`: configuración de build/rutas para desplegar como sitio estático en Vercel.

## Cómo subir esto a GitHub

1. Descomprime este zip.
2. Dentro de la carpeta descomprimida:
   ```
   git init
   git remote add origin https://github.com/joseluissalazar81-spec/Seguimiento-proyecto-2026-2.git
   git add -A
   git commit -m "Separar dashboard 2026-2 en su propio repositorio"
   git branch -M main
   git push -u origin main
   ```

## Cómo reconectar Vercel

1. En Vercel, entra al proyecto **seguimiento-proyecto-2026-2** (el que hoy apunta mal a `seguimiento-proyecto-2026-1`).
2. **Settings → Git → Disconnect** (repo actual: `seguimiento-proyecto-2026-1`).
3. **Connect Git Repository** → selecciona `Seguimiento-proyecto-2026-2`, rama `main`.
4. Espera el primer deploy y confirma que `seguimiento-proyecto-2026-2.vercel.app` ahora muestra
   el dashboard de 2026-2 (título "Seguimiento Proyecto e-Learning UST 2026-2").

## Pendiente en el repo `seguimiento-proyecto-2026-1`

Una vez confirmado que el sitio nuevo funciona, conviene limpiar ese repo:
- Eliminar la carpeta `2026-2/` (ya no debería vivir ahí).
- El archivo `data/seguimiento-2026-2.csv` puede quedarse ahí sin problema — es el destino
  que ya usa el flujo de Power Automate, y el nuevo sitio lo sigue leyendo desde esa ruta.

## Falta un proyecto de Vercel para 2026-1

Hoy el dashboard de 2026-1 (la raíz de `seguimiento-proyecto-2026-1`) solo se ve por accidente
bajo el dominio de 2026-2. Una vez hecha la reconexión de arriba, hay que crear un **proyecto
nuevo en Vercel** (Import Project) conectado a `seguimiento-proyecto-2026-1`, rama `master`,
para que el dashboard de 2026-1 tenga su propia URL.
