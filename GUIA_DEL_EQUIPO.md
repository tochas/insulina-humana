# Guía común del equipo

Todos deben poder explicar esta sala y orientar los tres retos. La ficha adjunta es la base; las fuentes se consultan también desde cada estación. El guion es aproximado: ensáyenlo a su ritmo.

## Guion de 60–90 segundos

Esta es la insulina humana, una hormona producida por las células beta del páncreas. Tiene 51 aminoácidos: 21 en A y 30 en B. Su secuencia no es solo una lista: determina regiones que se pliegan y se reconocen en el espacio. Seis cisteínas forman tres puentes disulfuro. Dos unen A con B y uno está dentro de A; estabilizan la conformación.

Una unidad A+B se llama monómero. Seis unidades pueden asociarse en un hexámero con zinc, útil para almacenamiento. El monómero reconoce al receptor; el hexámero no se acopla intacto. La insulina no es una enzima ni transporta glucosa: activa señales que regulan su metabolismo.

Una aplicación concreta es una pluma de insulina humana regular. Administra una formulación al tejido subcutáneo, donde su asociación molecular influye en la disponibilidad posterior. La Ingeniería Biomédica combina precisión del dispositivo, materiales compatibles y estabilidad de la molécula. Ahora identifica un residuo y construye los tres puentes.

## Datos científicos fundamentales

| Dato | Significado |
|---|---|
| Homo sapiens; hormona peptídica globular | Es una señal molecular humana, no una enzima digestiva |
| A: 21; B: 30; total: 51 | Son las cadenas de la forma madura; 110 corresponde a preproinsulina |
| A6–A11 | Puente disulfuro intracadena |
| A7–B7 y A20–B19 | Puentes disulfuro intercadenas |
| Hélices y segmentos flexibles | Organizan la superficie espacial de reconocimiento |
| A+B = monómero | Convención para describir asociación de unidades de insulina |
| 6(A+B) = hexámero | Seis moléculas, doce cadenas; forma de asociación favorecida por zinc |
| His B10, grupo imidazol | Coordina zinc; no equivale a una unión con el receptor |
| PDB 1TRZ | Insulina humana sin mutaciones; cristal a 1,60 Å; no contiene receptor |
| Ensamblaje biológico 3 | Contiene el hexámero completo; el ensamblaje 1 no lo contiene |

Secuencias N → C:

```text
A  GIVEQCCTSICSLYQLENYCN
B  FVNQHLCGSHLVEALYLVCGERGFFYTPKT
```

## Niveles: cómo explicarlos sin confundir

**Primaria:** orden de aminoácidos. Al pulsar una letra se localiza el residuo real en 3D.

**Secundaria:** el archivo anota hélices alfa A1–A7, A12–A17, B8–B20 y una hélice 3₁₀ B21–B23 para el par A+B. En el dímero, B24–B26 y D24–D26 forman la pequeña lámina beta antiparalela. Los límites son los del archivo, no fronteras universales de todas las conformaciones de insulina.

**Terciaria:** plegamiento compacto estabilizado por disulfuros e interacciones entre cadenas laterales. La posición espacial de los grupos importa para la función.

**Cuaternaria:** asociación de unidades A+B en dímeros y hexámeros. A+B contiene dos cadenas covalentemente unidas; se aclara la convención de “monómero” al comparar esas asociaciones. Las futuras proteínas pueden omitir un nivel no aplicable.

## Una aplicación concreta

La sala toma como ejemplo **NOVOLIN R FlexPen**, una pluma precargada con solución de insulina humana regular y zinc, según la ficha oficial. No se explican dosis ni se recomienda tratamiento.

La formulación concentrada favorece la asociación. El dispositivo desplaza solución del cartucho hacia tejido subcutáneo. La dilución y dispersión de excipientes favorecen disociación hacia dímeros y monómeros. Eso contribuye a la disponibilidad de formas absorbibles; la absorción también depende del tejido y la formulación. La insulina alcanza tejidos diana por la circulación. El monómero reconoce al receptor, reajusta su extremo B y activa señalización.

Para el ingeniero, estabilidad de la proteína, materiales del cartucho y precisión mecánica de administración son problemas conectados. Un dispositivo que entrega líquido no corrige una proteína mal plegada. Tampoco convierte por sí mismo la insulina en glucosa ni mide glucosa por tener un cartucho.

1TRZ ilustra asociación con zinc; **no es una medición del contenido exacto de esa pluma**, y la transición entre vistas no es una simulación farmacocinética.

## Preguntas frecuentes

- **¿La insulina tiene sitio activo?** No es una enzima. Tiene superficies de reconocimiento. “Sitio activo” enzimático implica catálisis; un sitio de unión no la implica.
- **¿Quién sí tiene actividad enzimática?** El receptor de insulina es una tirosina cinasa.
- **¿Un aminoácido explica toda la unión?** No. Se necesita una superficie y una conformación; resaltamos ejemplos con respaldo experimental.
- **¿El modelo muestra la insulina unida al receptor?** No. 1TRZ no contiene receptor. Las regiones relevantes se identifican a partir de estudios externos claramente citados.
- **¿Por qué no basta conservar la secuencia?** Puede alterarse el plegamiento, perdiendo la posición de los grupos que reconocen al receptor.
- **¿Zinc y disulfuro son lo mismo?** No. Zn coordina histidinas de moléculas vecinas; S–S es un enlace covalente entre cisteínas.
- **¿Seis cisteínas significan seis puentes?** No. Dos cisteínas por puente: son tres.
- **¿La cadena B es toda la interfaz?** No. Contribuyen residuos de A y B.
- **¿Puede llamarse monómero si tiene dos cadenas?** Sí, aquí “monómero” es la unidad madura A+B dentro del equilibrio de asociación entre moléculas.
- **¿Hay lispro en este modelo?** No. Lispro intercambia las posiciones de Pro B28 y Lys B29; 1TRZ mantiene la secuencia humana original.
- **¿La pluma actúa como una bomba automatizada?** No. El ejemplo es una pluma; no le atribuimos sensores ni un algoritmo de administración automatizada.

## Cinco preguntas de repaso

1. ¿51 o 110 aminoácidos? **51 maduros; 110 en el precursor.**
2. ¿Cuál enlace está dentro de A? **A6–A11.**
3. ¿Qué unidad reconoce al receptor? **Monómero A+B, con ajuste conformacional.**
4. ¿Qué coordina el zinc? **Imidazoles de histidinas B10 de varias moléculas.**
5. ¿Qué hace la pluma? **Administra formulación; la insulina ejerce el reconocimiento molecular.**

## No digan

- “La insulina rompe o transporta glucosa”.
- “El hexámero se pega entero al receptor”.
- “A+B son dos moléculas maduras independientes”.
- “Todos los aminoácidos amarillos son un sitio activo”.
- “El juego reproduce cómo se forma la insulina en la célula”.
- “Toda proteína debe tener hélices, láminas y estructura cuaternaria”.
- “La maestra confirmó tal porcentaje o fecha” a partir de pasajes dudosos.

Fuentes completas y enlaces: `README.md`, `src/data/insulin.ts` y el modo expositor. Antes del stand, cada integrante debe resolver los tres retos y explicar la secuencia → estructura → propiedad → función → aplicación.
