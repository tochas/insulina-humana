# Resultados de pruebas — versión 1.0

Fecha: 6 de octubre de 2026. Windows x64, Node 24.19.0, Microsoft Edge 154.0.4258.53. Se probó la compilación de producción servida desde localhost, además de la lógica TypeScript. Los informes JSON y diez capturas están en `evidence`.

## Resultado

| Área | Resultado | Evidencia |
|---|---|---|
| TypeScript y compilación Vite | Sin errores; `dist` generado | `pnpm build` |
| Lógica automatizada | 12 pruebas aprobadas | `evidence/unit-report.json` |
| Interfaz y experiencia completa | 40 comprobaciones aprobadas; cero errores de consola | `evidence/e2e-report.json` |
| Entradas y reinicios | 15 comprobaciones aprobadas | `evidence/input-report.json` |
| Coordenadas moleculares | Monómero, dímero y hexámero auditados | `evidence/molecular-audit.json` |
| PWA | Cero errores de instalabilidad en perfil persistente de prueba | `evidence/pwa-installability.json` |
| Inicio y cierre Windows | Ambos BAT ejecutados; segundo inicio reutiliza servidor | `evidence/launcher-report.json` |

Las 67 pruebas/comprobaciones de lógica e interacción se complementan con la auditoría molecular, de instalabilidad y del iniciador. Un conteo de aserciones no es una certificación universal de hardware.

## Qué se comprobó

- Modelo local: 399 átomos y 51 residuos en A+B; secuencias completas A21/B30 y numeración correcta.
- Disulfuros: A6–A11, A7–B7 y A20–B19; distancias entre azufres de 2,003, 2,031 y 2,049 Å en el par principal. El hexámero contiene seis unidades y 18 puentes equivalentes.
- Ensamblaje biológico 3: 12 cadenas, 306 residuos y dos posiciones únicas de zinc; cada zinc tiene tres His B10 con NE2 a aproximadamente 2,02–2,05 Å.
- Selección bidireccional: una posición de secuencia enfoca el residuo real; un clic proyectado sobre átomos del modelo señala la secuencia. La selección durante el reto también se sincroniza.
- Reto: se rechaza una pareja incorrecta, se completan los tres enlaces y se restaura la geometría madura; las pruebas de lógica rechazan duplicados.
- Comparación: dos visores 3D simultáneos, monómero dentro de su panel y retroalimentación para respuestas correctas e incorrectas. Vista de zinc con hexámero encuadrado.
- Representaciones: cintas, bolas y varillas, superficie, combinada y disulfuros, sin errores WebGL en las pruebas.
- Aplicación: se rechaza una secuencia incorrecta y se completan seis pasos de cartucho a respuesta celular.
- Mouse, rueda y teclado; eventos táctiles de arrastre y pinza generados por Chromium.
- Gamepad API: detección, flanco de pulsación, Y, X, RB, Menu, View, cruceta, ambas palancas, gatillo y desconexión. La prueba unitaria comprueba el mapa de botones completo. El diagnóstico visual prueba calibración, zona muerta y suavizado.
- Modo museo: espera real de 20 segundos, inicio automático, interrupción con entrada del visitante y llegada al mensaje final con duración de prueba abreviada. La duración normal es 77 segundos.
- Modo expositor, narración WAV local, subtítulos, ajustes y auditoría de recursos.
- Reinicios repetidos; limpieza del progreso de los retos y regreso a bienvenida.
- Resoluciones 1366 × 768 y 1920 × 1080, texto ampliado y reducción de movimiento; sin desbordamiento horizontal de página. Los paneles informativos permiten desplazamiento deliberado cuando el contenido lo requiere.
- Service worker activo, manifest standalone, iconos y precaché local. Pérdida de red simulada con `context.setOffline(true)`, recarga de la página y carga de hexámero y PDF desde caché.
- Cero solicitudes externas obligatorias durante el recorrido probado.
- Ejecución real de `INICIAR_MUSEO.bat` y `CERRAR_MUSEO.bat`, apertura de ventana Edge con título del museo y reutilización del servidor al iniciar dos veces.

## Correcciones realizadas durante las pruebas

Se corrigieron el encuadre de la comparación, la acumulación de movimientos de cámara al cambiar rápidamente de estación, la respuesta HEAD de la caché para abrir la ficha offline, la comprobación interna de localhost en PowerShell, el resaltado de la cisteína seleccionada en el reto y el encuadre del hexámero. Las capturas entregadas proceden de la aplicación ejecutada.

## Rendimiento y límites reales

`input-report.json` registra cuatro segundos de rotación del hexámero con representación combinada, FPS y percentil 95 de tiempo entre cuadros. La medición se realiza con Edge automatizado en esta laptop; no equivale a rendimiento garantizado en otras pantallas, GPU o equipos. No se limita el bucle a 60 Hz, por lo que puede registrar más de 60 FPS. Se debe ensayar en el equipo del stand.

No hubo mando Xbox ni pantalla táctil físicos disponibles para la prueba. Sus eventos se simularon en la ruta real de entrada y existe un diagnóstico para comprobar después conexión, calibración y botones. La vibración es opcional y no está verificada en hardware.

Se simuló la PWA y se verificó su instalabilidad en un perfil aislado; no se instaló en el perfil personal del usuario. El primer perfil efímero informó `in-incognito`, restricción esperada de Chromium; la comprobación posterior en perfil persistente no reportó errores. No se activó el modo avión físico de Windows: se simuló la ausencia de red del navegador y se verificó que los recursos fueran locales.

La vista de receptor resalta residuos de insulina apoyados por bibliografía; no muestra un complejo experimental con receptor. El modelo sigue siendo 1TRZ. Las otras tres salas están deshabilitadas y requieren sus fichas, modelos y validación. No se implementaron los opcionales de cámara, música, sello, captura desde la interfaz ni un QR sin destino; se dejó el campo de enlace digital vacío.

## Repetir las pruebas

```powershell
pnpm install
pnpm test
pnpm audit:models
pnpm build
# Mantén el servidor iniciado con INICIAR_MUSEO.bat.
$env:PLAYWRIGHT_MODULE = 'ruta/a/node_modules/playwright'
node scripts/e2e.cjs
node scripts/input-simulation.cjs
node scripts/check-installability.cjs
```

Playwright y Python son herramientas de desarrollo, no requisitos para ejecutar la exposición. Las capturas `01` a `10` también sirven de respaldo explicativo si el equipo no dispone de WebGL.
