import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const files = readdirSync(root);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const indexable = htmlFiles.filter((file) => !["404.html", "googledbc82cb042446e5d.html"].includes(file));
const errors = [];
const canonicals = new Set();

const routeToFile = (href) => {
  const route = href.split("#")[0].split("?")[0];
  if (route === "/" || route === "") return "index.html";
  return `${route.replace(/^\//, "")}.html`;
};

for (const file of indexable) {
  const html = readFileSync(resolve(root, file), "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
  const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1] ?? "";
  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1] ?? "";
  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;

  if (!html.includes('<html lang="es-AR">')) errors.push(`${file}: lang faltante`);
  if (!title || title.length > 65) errors.push(`${file}: title ausente o largo (${title.length})`);
  if (description.length < 100 || description.length > 165) errors.push(`${file}: description fuera de rango (${description.length})`);
  if (h1Count !== 1) errors.push(`${file}: debe tener un H1, tiene ${h1Count}`);
  if (!canonical.startsWith("https://ganaconmatias.vercel.app/")) errors.push(`${file}: canonical inválido`);
  if (canonicals.has(canonical)) errors.push(`${file}: canonical duplicado`);
  canonicals.add(canonical);

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${file}: JSON-LD inválido (${error.message})`);
    }
  }

  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1];
    if (/^\/(?:style\.css|app\.js|favicon\.svg)/.test(href)) continue;
    const target = routeToFile(href);
    if (!files.includes(target)) errors.push(`${file}: enlace interno roto ${href}`);
  }
}

const publicSource = indexable.map((file) => readFileSync(resolve(root, file), "utf8")).join("\n");
if (/wa\.me\/|wa\.link\/(?:ojccb8|j1u0ep)/i.test(publicSource)) errors.push("Se encontró un enlace de WhatsApp anterior");

const whatsappHrefs = [...publicSource.matchAll(/href="(https:\/\/(?:wa\.link|wa\.me)[^"]+)"/g)].map((match) => match[1]);
const invalidWhatsApp = whatsappHrefs.filter((href) => href !== "https://wa.link/1vfkxs");
if (invalidWhatsApp.length) errors.push(`CTA de WhatsApp inválidos: ${[...new Set(invalidWhatsApp)].join(", ")}`);
if (!whatsappHrefs.length) errors.push("No se encontraron CTA de WhatsApp");

const sitemap = readFileSync(resolve(root, "sitemap.xml"), "utf8");
for (const canonical of canonicals) {
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) errors.push(`Sitemap sin ${canonical}`);
}

if (errors.length) {
  console.error(`Validación fallida (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`OK: ${indexable.length} páginas indexables, ${whatsappHrefs.length} CTA y ${canonicals.size} canonicales únicos.`);
