# Instrucciones para la exposición

## Antes de salir

1. Copia la carpeta completa `museo-proteinas` a la laptop y a una USB. La copia debe incluir `dist`, `runtime`, `scripts` y los dos BAT.
2. Carga completamente la laptop. Lleva cargador, control Xbox y su cable USB o adaptador que ya tengas.
3. Imprime `public/docs/Insulina-Humana.pdf`. La aplicación complementa la ficha; no la sustituye.
4. Ensaya los tres retos y el guion con todos los integrantes. Dos pueden atender el stand mientras los demás recorren las exhibiciones; cambien turnos.

## Abrir en el stand

1. Conecta cargador y, si vas a usarlo, el mando. El cable USB evita depender de una batería o emparejamiento inalámbrico.
2. Haz doble clic en **INICIAR_MUSEO.bat**. Se abrirá la aplicación en Edge o Chrome, usando `localhost:4173`.
3. Espera el indicador **OFFLINE PREPARADO**. Pulsa **INICIAR EXPERIENCIA**.
4. Pulsa **F** o el icono de pantalla completa. Si Windows o el navegador no lo permite, usa F11. Para salir, Escape o F11 según el modo.
5. En Ajustes → Diagnóstico, pulsa A en el mando. Comprueba que aparece “mapeo estándar”, mueve las dos palancas, usa gatillos y cruceta. Suelta las palancas y pulsa **Calibrar**. Si deriva, aumenta un poco la zona muerta.
6. Pulsa Audio si quieres narración. Empieza con volumen bajo. Los subtítulos y el texto permiten trabajar sin sonido.

## Instalación PWA opcional

Con el iniciador funcionando, abre `http://localhost:4173` en una pestaña normal de Edge o Chrome. Usa el botón de instalación de la barra o el menú Aplicaciones → instalar este sitio como aplicación. La PWA tendrá icono y ventana propia. Después del primer almacenamiento completo puede abrir offline; el iniciador sigue siendo el respaldo más sencillo.

La versión entregada ya está compilada. No hace falta abrir PowerShell, instalar paquetes ni escribir comandos durante la exposición.

## Con un visitante

1. **Explora:** invítalo a arrastrar la molécula y seleccionar A7 en la secuencia. Pregunta dónde aparece B7.
2. **Relaciona:** entra a Estructura y explica la relación entre orden de aminoácidos, plegamiento y estabilidad.
3. **Arma:** en la estación 04 inicia el reto. Busca A6–A11, A7–B7 y A20–B19. La separación es didáctica; no explica la biosíntesis real.
4. **Decide:** estación 05, comparación lado a lado. La unidad monomérica A+B reconoce al receptor; el hexámero favorece almacenamiento.
5. **Aplica:** estación 09. Ordena Cartucho → Tejido subcutáneo → Disociación → Disponibilidad → Receptor → Respuesta celular.
6. Al terminar pulsa **REINICIAR PARA EL SIGUIENTE VISITANTE**. Vuelven la bienvenida y los retos vacíos.

## Presentación de fondo

Tras 20 segundos sin interacción comienza un recorrido de 77 segundos. Cualquier movimiento, pulsación o toque lo detiene. Para dejarlo repetir: Ajustes → **Presentación permanente**. También puedes iniciar el recorrido desde Ajustes → Iniciar modo museo.

La duración se configura en segundos. Con narración conserva 77 s o más para evitar cortar frases. El tiempo global de cinco a diez minutos queda pendiente de confirmar con la rúbrica; no se presenta como límite oficial por proteína.

## Modo del equipo

Pulsa **Ctrl+Mayús+E** o Ajustes → Modo expositor. Contiene guion, cinco preguntas, respuestas, errores frecuentes y fuentes. Cierra con Escape o ✕ antes de entregar el control al visitante.

## Si algo falla

- **Entrada o cámara desorientada:** R o View del mando para centrar.
- **Reto a medias:** Reiniciar para el siguiente visitante.
- **El mando falla:** continúa con mouse, teclado o táctil. No requiere detener el stand.
- **Sin audio:** muestra el texto y subtítulos; revisa silencio/volumen y el archivo WAV más tarde.
- **La ventana no responde:** Ctrl+R. Si continúa, Alt+F4 → CERRAR_MUSEO.bat → INICIAR_MUSEO.bat.
- **Falta un archivo o no abre:** descomprime otra copia del ZIP en una carpeta de la laptop y ejecuta su iniciador. No muevas archivos sueltos.
- **Sin internet:** no es un problema después de preparar la caché; todos los recursos necesarios están en la carpeta.
- **Problema de WebGL:** prueba Edge o Chrome con aceleración gráfica. Como respaldo explicativo, usa `evidence/02-sala-1366.png`, `04-comparacion.png`, `05-zinc.png`, la guía y la ficha impresa. Las imágenes son un respaldo de explicación, no una sustitución de la interactividad.

## Cierre

Pulsa CERRAR_MUSEO.bat y cierra la ventana. El BAT no cierra otras pestañas ni programas. Guarda el control y la USB con el cargador.
