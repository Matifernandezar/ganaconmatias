# GanaconMatias — SEO rebuild 2026

Reconstrucción del sitio histórico GanaconMatias enfocada en recuperar visibilidad orgánica alrededor de las intenciones que mejor encajaron con el proyecto original: casino online + WhatsApp + atención 24 horas + recargas.

## Arquitectura

- `/` — home principal
- `/casino-online-whatsapp` — intención principal de contacto por WhatsApp
- `/casino-online-24-horas` — disponibilidad y atención
- `/recarga-casino-whatsapp` — consultas de recarga
- `/juego-responsable` — información +18 y reducción de riesgos

## Stack

- HTML5 estático
- CSS propio, responsive y sin frameworks
- JavaScript vanilla mínimo
- Vercel con `cleanUrls`

## SEO técnico

- Canonical propio en cada URL
- Titles y descriptions únicos
- H1 único por página
- Navegación e interlinking semántico
- Breadcrumb schema en las guías
- WebSite schema en la home
- `robots.txt`
- `sitemap.xml`
- Google Search Console verification file preservado
- URLs limpias
- HTML renderizado en servidor/CDN, sin depender de JavaScript para el contenido SEO

## Conversión y medición

Todos los accesos principales usan el mismo canal de WhatsApp configurado en el sitio. `app.js` emite el evento `click_whatsapp` a `window.dataLayer`; no se incluye ningún ID ficticio de GA4 o GTM.

## Principios de contenido

No crear páginas masivas con pequeñas variaciones de keywords. Cada URL debe responder una intención distinta y aportar contenido propio. No usar promesas de ganancias ni afirmaciones no verificadas.

## Próxima iteración con Search Console

Cuando exista acceso al histórico completo de Search Console, ajustar por datos reales:

1. top queries por clics e impresiones;
2. CTR por consulta y URL;
3. posición media de las consultas prioritarias;
4. consultas en posiciones 4–20 con potencial de crecimiento;
5. canibalización entre home y landings;
6. titles/descriptions de páginas con impresiones y bajo CTR;
7. contenido adicional solamente cuando una consulta real lo justifique.
