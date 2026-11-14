# My_page — portafolio de Eduardo Esteban Trujillo

Sitio estático de cuatro páginas: `index.html` (inicio), `proyectos.html`,
`sobre-mi.html` y `contacto.html`. Sin build, sin dependencias, sin recursos externos.

## Estructura

```
index.html          inicio
proyectos.html      los dos proyectos
sobre-mi.html       texto, datos rápidos y habilidades
contacto.html       correo, GitHub y disponibilidad
assets/css/site.css tokens, componentes y transición entre páginas
assets/js/site.js   interacción opcional (revelado, resplandor, copiar correo)
.nojekyll           evita el procesado de Jekyll en GitHub Pages
```

## Ver en local

Cualquier servidor estático sirve. Las rutas son relativas, así que también abre
`index.html` con doble clic, aunque el servidor es más fiel:

```sh
python3 -m http.server 8080
# http://127.0.0.1:8080/
```

## Publicar en GitHub Pages

El sitio se sirve desde una subruta: `https://eetrujillo.github.io/My_page/`.
Por eso **todas** las rutas son relativas y ningún `href` empieza con `/`.

1. En el repositorio, *Settings → Pages*.
2. *Source*: `Deploy from a branch`.
3. *Branch*: `main`, carpeta `/ (root)`.
4. Guardar. El primer despliegue tarda uno o dos minutos.

No hace falta GitHub Actions: todo es estático y vive en la raíz del repo.

## Transición entre páginas

`@view-transition { navigation: auto }` en `site.css` anima el cambio de documento en
los navegadores que lo soportan (Chrome/Edge 126+, Safari 18.2+). La cabecera lleva
`view-transition-name: site-head` para no re-animarse, y la barra del enlace activo
lleva `nav-bar`, que se desliza entre páginas. Firefox y navegadores viejos navegan
normal: es mejora progresiva pura, sin JavaScript.

## Movimiento y accesibilidad

- Solo se animan `transform` y `opacity`.
- `prefers-reduced-motion: reduce` conserva un fundido de 120 ms y elimina todo
  desplazamiento, además del revelado y el imán del botón.
- Sin JavaScript el contenido completo sigue visible: el estado oculto del revelado
  depende de la clase `.js-enabled`.

## Contenido pendiente

- Falta la URL de LinkedIn.
- Los enlaces de cada proyecto apuntan al perfil de GitHub mientras no existan
  repositorios o demos públicas.
