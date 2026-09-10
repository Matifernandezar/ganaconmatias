# GanaconMatias

Sitio estático orientado a búsquedas de casino por WhatsApp en Argentina, con contenido exclusivo para mayores de 18 años y foco en seguridad, claridad y juego responsable.

## Arquitectura SEO

| Ruta | Intención principal |
| --- | --- |
| `/` | casino WhatsApp Argentina |
| `/casino-online-whatsapp` | casino online WhatsApp |
| `/grupos-de-casinos-whatsapp` | grupos de casinos WhatsApp |
| `/casino-online-24-horas` | casino online 24 horas WhatsApp |
| `/recarga-casino-whatsapp` | recarga casino WhatsApp |
| `/juego-responsable` | juego responsable y límites |

La arquitectura evita competir de forma directa con `casinovirtual24hrs.com`, que conserva el foco general en “casino online 24 horas”.

## Conversión y medición

- Todos los CTA apuntan a `https://wa.link/1vfkxs`.
- Los clics generan el evento `whatsapp_click` en `dataLayer` para una integración futura con analítica.
- Los parámetros UTM de entrada se conservan únicamente durante la sesión del navegador.
- El acceso muestra una confirmación de mayoría de edad una vez por sesión.

## Desarrollo local

No requiere compilación. Puede servirse con cualquier servidor HTTP estático.
