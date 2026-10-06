# Museo Interactivo de Proteínas

Primera sala: **insulina humana**. Aplicación web progresiva para Windows, sin backend de datos, con TypeScript, Vite, WebGL y 3Dmol.js 2.5.3. Modelos, audio, subtítulos, iconos y ficha están incluidos localmente. No requiere cuenta, API, CDN ni internet durante la exposición.

## Uso inmediato

1. Conserva **toda esta carpeta**. No abras `dist/index.html` con doble clic.
2. Ejecuta **INICIAR_MUSEO.bat**. Inicia un servidor limitado a la laptop en `http://localhost:4173` y abre Edge o Chrome en ventana de aplicación.
3. Pulsa **INICIAR EXPERIENCIA**. Pulsa **F** para pantalla completa.
4. Al terminar, usa **CERRAR_MUSEO.bat** y cierra la ventana con Alt+F4. El cerrador solo detiene el servidor identificado por esta carpeta; no mata otros procesos de Node o del navegador.

El paquete de exposición incluye `runtime/node.exe` (Windows x64, Node 24.19.0) y su licencia. Si falta, el iniciador busca Node en PATH y muestra un mensaje claro. Edge/Chrome y aceleración gráfica deben estar disponibles. No requiere Blender.

## Experiencia

- Nueve estaciones con contenido breve, ampliación, evidencia y foco molecular.
- Secuencias A/B completas, nombres de aminoácidos, numeración, selección en ambos sentidos y cámara.
- Cuatro niveles estructurales aplicables; cinco representaciones, monómero, dímero y hexámero.
- Reto de los tres disulfuros: valida parejas, rechaza duplicados y devuelve la geometría madura.
- Comparación 3D simultánea y pregunta sobre reconocimiento del receptor.
- Recorrido interactivo del cartucho de una pluma al tejido, disociación, receptor y respuesta.
- Recorrido automático de 77 s tras 20 s sin interacción; cualquier entrada devuelve control. Interruptor de presentación permanente.
- Modo expositor, fuentes, ayuda, volumen, movimiento reducido, tamaño de texto y diagnóstico del mando.
- PDF original accesible localmente, además del recordatorio de llevarlo impreso.

## Arquitectura

| Archivo o carpeta | Responsabilidad |
|---|---|
| `src/data/insulin.ts` | Configuración y contenido académico de la insulina; fuentes, audios y recorrido |
| `src/data/protein-template.ts` | Plantilla deshabilitada, sin inventar una proteína |
| `src/types.ts` | Contrato común para las salas |
| `src/proteins.ts` | Catálogo de cuatro espacios, diccionario de aminoácidos y ajustes de colección |
| `src/molecule.ts` | Carga 3D, selección atómica, estilos, cámara y etiquetas |
| `src/core.ts` | Validadores, reto, reloj, botones, zona muerta y suavizado |
| `src/main.ts` | Interfaz compartida, actividades, audio, Gamepad API y navegación |
| `src/style.css` | Sistema visual y adaptación a resoluciones |
| `public/models` | Originales PDB/mmCIF, derivados y procedencia |
| `public/audio` | WAV españoles, subtítulos JSON y duración medida |
| `public/docs` | Ficha técnica original |
| `scripts/build-sw.mjs` | Service worker de precaché, versionado por contenido |
| `scripts/server.mjs` | Servidor estático localhost, con MIME, rangos y cierre autenticado local |
| `tests` / `evidence` | Pruebas de lógica, auditoría molecular, pruebas integradas y capturas |

La interfaz mantiene nueve posiciones informativas compartidas; el contenido de cada posición pertenece a la configuración. Los niveles se filtran por `applicable`. No se debe forzar un hexámero, zinc, receptor o disulfuro a una futura proteína: habrá que configurar sus interacciones reales y elegir los tipos de actividad apropiados. Los adaptadores actuales de los tres retos están especializados en insulina; la plantilla y el contrato permiten conservar el diseño y los controles al incorporar nuevo contenido científico, pero una actividad bioquímicamente distinta requiere su adaptador y pruebas. La primera entrega no afirma tener tres salas adicionales terminadas.

## Instalar y desarrollar

Para modificar código se necesita Node 22.12+ y pnpm. El paquete de exposición ya está compilado y no necesita instalar dependencias.

```powershell
pnpm install
pnpm dev
pnpm test
pnpm audit:models
pnpm build
pnpm preview
```

`pnpm dev` sirve la versión de desarrollo; para probar offline hay que usar `pnpm build` y `pnpm preview`, o el iniciador. `pnpm-lock.yaml` fija versiones. `pnpm-workspace.yaml` solo autoriza el paso de compilación de esbuild. `dist` es la compilación lista para servir. El motor portátil puede ejecutar directamente `runtime\node.exe scripts\server.mjs`.

## PWA e instalación

Abre `http://localhost:4173` en una pestaña normal de Edge o Chrome y espera **OFFLINE PREPARADO**. Usa el icono de instalación del navegador o su menú Aplicaciones → instalar este sitio como aplicación. El botón Instalar PWA de Ajustes usa el evento de instalación cuando el navegador lo ofrece; en una ventana `--app` puede no ofrecerlo.

La aplicación se instala en modo `standalone`, tiene iconos de 192 y 512 px y preferencia horizontal. F activa Fullscreen API; F11 es alternativa del navegador. La instalación nativa en el perfil personal no se fuerza durante las pruebas; se verifica el manifest, el control del service worker y la recarga offline en un perfil automatizado aislado.

## Offline y actualización

El service worker precarga JS, CSS, visor, modelos, iconos y WAV/JSON. La ficha y los archivos de coordenadas originales son recursos opcionales para el arranque: una ficha ausente no bloquea el museo. También responde comprobaciones HEAD desde la caché. No hay telemetría ni peticiones obligatorias externas. Las fuentes científicas externas se abren únicamente si alguien pulsa un enlace; su explicación de evidencia ya está incluida sin red.

La fuente tipográfica es la **Segoe UI instalada en Windows**, con alternativas locales Arial/sans-serif; no se descarga una fuente. Después de compilar cambios, reinicia la aplicación y permite que el nuevo service worker se active. Cierra y abre la ventana una segunda vez si se conserva una página antigua. La caché está asociada al origen: mantén `localhost:4173`, no alternes con otra dirección o puerto al instalar.

Para un ensayo fiable, carga primero hasta OFFLINE PREPARADO, desactiva Wi-Fi y recarga. Prueba hexámero, audio y ficha. El servidor localhost no necesita internet. Las pruebas entregadas simulan la pérdida de red del navegador; no cambian el modo avión físico de Windows.

## Controles

| Entrada | Acción |
|---|---|
| Mouse arrastrar / rueda | Rotar / zoom |
| Botón derecho / dos dedos | Desplazar; pinza táctil para zoom |
| Pulsa residuo o secuencia | Seleccionar y enfocar |
| WASD / flechas | Rotar |
| + / − | Acercar / alejar |
| R / M / X | Centrar / monómero–hexámero / etiquetas |
| I / F / Espacio / Escape | Información / pantalla completa / pausa / cerrar |
| Tab, Mayús+Tab, Enter | Navegar opciones y confirmar |
| Ctrl+Mayús+E | Modo expositor |
| Xbox palanca izquierda / derecha | Rotar / desplazar |
| Xbox LT / RT | Alejar / acercar |
| Xbox cruceta ← → / ↑ ↓ | Estaciones / opciones enfocables |
| Xbox A / B / X / Y | Confirmar / regresar / etiquetas / organización |
| Xbox LB / RB | Representación anterior / siguiente |
| Xbox Menu / View | Pausa / centrar |

Se usa mapeo `standard`, zona muerta predeterminada 0,16, suavizado dependiente del tiempo y límites de zoom del visor. Ajustes → Diagnóstico muestra datos y un simulador. Calibra con las palancas quietas. La vibración es opcional, se intenta solo al acertar y su ausencia no impide continuar. No se dispuso de un mando físico para certificar sus controladores, latencia o vibración.

## Audio

Incluye seis narraciones completas y once frases breves para el recorrido automático. Son voces sintéticas locales de Windows, en español de España. Volumen y silencio están en la interfaz; inicia en silencio para evitar reproducción no solicitada. Los subtítulos de cada WAV se guardan en `public/audio/<nombre>.json`, con `start`, `end` en segundos y `text`. Las frases del recorrido caben en sus ventanas de siete segundos por defecto. Si se acorta la duración configurada, pueden truncarse: usa 77 s o más cuando haya audio.

Reemplaza los WAV por grabaciones del equipo y actualiza sus subtítulos; conserva nombres o modifica `audios` en la configuración. Después ejecuta `pnpm build`. Para regenerar con una voz local: `node scripts/export-audio.mjs`, `powershell -File scripts/generate-audio.ps1` y `python scripts/combine-audio.py` (Python estándar, sin red). La exportación TypeScript directa de ese script requiere Node 24 o `tsx` en versiones anteriores. `audio-report.json` contiene duraciones reales.

## Incorporación de las otras proteínas

1. Consigue la ficha verificada y coordenadas experimentales apropiadas. No renombres 1TRZ como otra proteína.
2. Copia la plantilla a `src/data/<id>.ts`. Completa identidad, modelos, ensamblaje, cadenas y secuencias, mapa de cadenas de copias, colores y anotaciones secundarias con evidencia.
3. Completa los nueve puestos informativos con regiones, grupos, función, interacción y una aplicación concreta; marca niveles no aplicables como `false`. Una posición dedicada a zinc en insulina debe tener una interacción real de la nueva proteína o quedar deshabilitada.
4. Configura las actividades apropiadas, preguntas, narraciones, fuentes y recorrido. Usa los mismos controles y componentes; añade un adaptador de actividad solo cuando el mecanismo científico lo requiera.
5. Registra la configuración en el catálogo, reemplaza un espacio pendiente y habilítala solo tras auditar residuos y ensayar toda la sala. La portada conserva cuatro espacios.
6. Ajusta el presupuesto del recorrido de colección en `collectionSettings` y confirma el alcance de cinco a diez minutos cuando llegue la rúbrica. `officialRubric` y `evaluationCriteria` quedan vacíos; no se inventan ponderaciones.

## Exactitud y fuentes

La ficha adjunta es la base académica. 1TRZ es **insulina humana sin mutaciones**, resolución 1,60 Å. A+B del archivo original es el monómero. El dímero contiene A+B y C+D. El hexámero se deriva del **ensamblaje biológico 3**, no del ensamblaje 1 ni solo de la unidad asimétrica. Sus tres bloques MODEL son copias de simetría; se renombran A–L, conservando coordenadas, y se consolidan zinc coincidentes en dos posiciones. No se generan formas moleculares con IA.

Los derivados omiten agua, cloruro, sodio y conformaciones alternativas; originales y hashes se conservan. `evidence/molecular-audit.json` verifica secuencias, 18 disulfuros del hexámero y coordinación Zn–NE2. Las distancias S–S del primer par son 2,003, 2,031 y 2,049 Å. Se muestran grupos reales, no marcadores aproximados. La separación de cadenas del reto es una traslación rígida didáctica claramente rotulada.

El visor de interacción muestra residuos relevantes de insulina, **no un complejo con receptor**. Sus inferencias proceden de estructuras y estudios publicados; no se presentan como contactos observados en 1TRZ. “Monómero” designa una unidad A+B. No se atribuye sitio activo catalítico a la hormona.

- [RCSB 1TRZ — Ciszak y Smith, 1994](https://www.rcsb.org/structure/1TRZ).
- [RCSB PDB-101 — Insulin](https://pdb101.rcsb.org/global-health/diabetes-mellitus/drugs/insulin/insulin).
- [UniProt P01308](https://www.uniprot.org/uniprotkb/P01308/entry).
- [Weiss, Steiner y Philipson — Endotext, 2014](https://www.ncbi.nlm.nih.gov/books/NBK279029/).
- [Menting et al., 2013 — unión al receptor](https://pubmed.ncbi.nlm.nih.gov/23302862/).
- [Menting et al., 2014 — apertura del extremo B](https://pmc.ncbi.nlm.nih.gov/articles/PMC4143003/).
- [DailyMed — NOVOLIN R / FlexPen, secciones 3, 11 y 16](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aee7f1f3-612c-4027-8ce9-4fd1f41eed71).
- [Pohl et al., 2012 — asociación y absorción de insulina humana](https://pmc.ncbi.nlm.nih.gov/articles/PMC3440144/).
- [Documentación oficial de 3Dmol.js](https://3dmol.org/doc/GLViewer.html).

## Pruebas y límites

Lee `RESULTADOS_PRUEBAS.md` y los informes JSON de `evidence`. Las pruebas automatizadas de interfaz están en `scripts/e2e.cjs`; requieren Playwright y Edge. Establece `PLAYWRIGHT_MODULE` a la ruta de tu instalación de Playwright; el valor predeterminado identifica el runtime donde se construyó este proyecto. La exposición no requiere Playwright ni Python.

No se ha implementado control por cámara, música, captura desde la aplicación, sello ni un QR con destino ficticio. Se priorizó el núcleo científico, el simulador y la comparación solicitada. Las tres salas futuras siguen deshabilitadas. No se garantiza FPS en hardware no probado; superficie y comparación son las vistas de mayor carga.

## Solución de problemas

- **Pantalla vacía:** usa el iniciador, no `file://`; recarga y revisa que exista `dist/vendor/3Dmol-min.js`. Habilita aceleración gráfica de Edge/Chrome si WebGL no está disponible.
- **Sin modelo:** Ajustes → Diagnóstico → Comprobar recursos. Copia `dist/models` desde el respaldo y recarga.
- **Sin sonido:** pulsa Audio, verifica volumen Windows/app y `dist/audio`. El texto siempre está visible.
- **Mando no detectado:** pulsa un botón para que el navegador lo exponga; prueba cable USB y diagnóstico. Un mando sin mapeo estándar no se interpreta con índices Xbox.
- **Ventana congelada:** Ctrl+R; si no responde, Alt+F4, CERRAR_MUSEO y vuelve a iniciar.
- **Puerto ocupado:** lee `server-error.log`; cierra otra copia del museo. No se detienen programas ajenos automáticamente.
- **Ficha ausente:** continúa la sala y usa la copia impresa. Restaurar el PDF no exige modificar contenido.
- **Cambio de computadora:** copia la carpeta completa o descomprime el ZIP, abre el iniciador y ensaya; la instalación PWA del equipo anterior no se transfiere.
