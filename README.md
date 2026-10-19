# Arquitectura desacoplada: microservicios

Sitio web educativo, adaptable a dispositivos móviles, para aprender los fundamentos de la arquitectura desacoplada y los microservicios. Incluye una comparación entre monolitos y microservicios, conceptos clave, un reproductor de video con carga local y un cuestionario interactivo de diez preguntas.

## Ejecutar en GitHub Codespaces

1. Abre `index.html` y selecciona **Open with Live Server**.
2. También puedes iniciar un servidor estático desde la raíz del proyecto:

   ```bash
   python3 -m http.server 8000
   ```

3. Abre el puerto 8000 en la vista **Ports** de Codespaces.

No se requiere instalación de dependencias ni proceso de compilación.

## Video

- El reproductor busca el archivo de ejemplo en `assets/video/microservicios.mp4`.
- También puedes usar el control **Cargar un video propio**. El navegador crea una URL temporal local; el archivo no se envía a un servidor.
- Agrega el video real en `assets/video/microservicios.mp4` antes de publicarlo. No se incluye un archivo MP4 vacío, porque no sería un video reproducible; mientras tanto, el reproductor muestra instrucciones para cargar un archivo desde el equipo.
- La portada del reproductor se encuentra en `assets/img/poster.svg`.

## Editar las preguntas del cuestionario

Modifica el arreglo `quizQuestions` al inicio de `js/script.js`. Cada pregunta tiene esta forma:

```js
{
  pregunta: "Texto de la pregunta",
  opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
  correcta: 0,
  explicacion: "Explicación que aparece después de confirmar."
}
```

`correcta` es el índice de la opción correcta, empezando por cero. El porcentaje se calcula sobre la cantidad de preguntas del arreglo.

## Personalizar colores

Edita las variables CSS en `:root`, al inicio de `css/styles.css`. La paleta principal incluye:

- `--color-primary`: azul principal (`#0d6efd`).
- `--color-primary-hover`: azul para hover y énfasis (`#0a58ca`).
- `--color-soft-blue`: fondos azules suaves (`#e7f1ff`).
- `--color-section`: fondo alterno (`#f8f9fa`).
- `--color-surface`: superficie blanca.

## Estructura del proyecto

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── README.md
├── img/
│   └── rene.jpg
└── assets/
    ├── img/
    │   ├── hero.svg
    │   └── poster.svg
    └── video/
        └── microservicios.mp4  (agregar el video)
```

La página utiliza Bootstrap 5.3 y Bootstrap Icons desde jsDelivr, además de la fuente Inter de Google Fonts. El perfil del autor se basa en la información proporcionada para este sitio: René Quisaguano, ingeniero en Informática y Sistemas Computacionales, magíster en Sistemas de Información, candidato a PhD en Informática, cofundador y CTO de Evolution Soft, y docente e investigador en la Universidad Técnica de Cotopaxi.
