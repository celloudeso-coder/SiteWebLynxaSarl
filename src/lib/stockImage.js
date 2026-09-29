// Photos de banque d'images (Pexels, Unsplash) : leurs CDN redimensionnent à
// la volée via des paramètres d'URL, gratuitement. On en tire un srcset pour
// que le navigateur ne télécharge que la largeur utile (l'URL Pexels brute
// sert l'original : jusqu'à 5 Mo pour une image affichée en 390 px).

const STOCK_WIDTHS = [320, 480, 640, 800, 1024, 1280, 1600, 1920];
const DEFAULT_WIDTH = 800;

export function stockImage(src) {
  let url;
  try {
    url = new URL(src);
  } catch {
    return null;
  }
  const isPexels = url.hostname === "images.pexels.com";
  const isUnsplash = url.hostname === "images.unsplash.com";
  if (!isPexels && !isUnsplash) return null;

  // Si l'URL d'origine impose un recadrage (w + h), on conserve ses
  // proportions à chaque largeur.
  const w0 = Number(url.searchParams.get("w")) || null;
  const h0 = Number(url.searchParams.get("h")) || null;
  const ratio = w0 && h0 ? h0 / w0 : null;

  const build = (width) => {
    const out = new URL(url.origin + url.pathname);
    if (isPexels) {
      out.searchParams.set("auto", "compress");
      out.searchParams.set("cs", "tinysrgb");
    } else {
      out.searchParams.set("auto", "format");
      out.searchParams.set("q", "70");
    }
    if (ratio) out.searchParams.set("fit", "crop");
    out.searchParams.set("w", String(width));
    if (ratio) out.searchParams.set("h", String(Math.round(width * ratio)));
    return out.toString();
  };

  return {
    src: build(DEFAULT_WIDTH),
    srcSet: STOCK_WIDTHS.map((w) => `${build(w)} ${w}w`).join(", "),
  };
}
