import React from 'react';
import manifest from '../lib/imageManifest.generated.json';

// En dev, le manifeste n'est pas régénéré à chaque sauvegarde (il n'est
// produit qu'au build — scripts/generate-image-variants.mjs) : on sert donc
// l'image d'origine telle quelle, sans <picture>/srcset, pour ne jamais
// pointer vers une variante qui n'existe pas sur le disque du serveur de dev.
const USE_MANIFEST = import.meta.env.PROD;

function Image({
  src,
  alt = "Image Name",
  className = "",
  width,
  height,
  sizes,
  priority = false,
  loading,
  decoding = "async",
  ...props
}) {
  const resolvedLoading = loading || (priority ? "eager" : "lazy");
  const onError = (e) => {
    e.target.onerror = null;
    e.target.src = "/assets/images/no_image.png";
  };

  const entry = USE_MANIFEST ? manifest?.[src] : null;

  if (entry && entry.variants?.length) {
    const webpSrcSet = entry.variants.map((v) => `${v.webp} ${v.w}w`).join(", ");
    const fallbackSrcSet = entry.variants.map((v) => `${v.fallback} ${v.w}w`).join(", ");
    const largestFallback = entry.variants[entry.variants.length - 1].fallback;

    return (
      <picture>
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
        <source srcSet={fallbackSrcSet} sizes={sizes} />
        <img
          src={largestFallback}
          alt={alt}
          className={className}
          width={width ?? entry.width}
          height={height ?? entry.height}
          loading={resolvedLoading}
          decoding={decoding}
          onError={onError}
          {...props}
        />
      </picture>
    );
  }

  // Source distante (CDN externe, stockage Supabase) ou locale sans
  // manifeste (dev, ou image ajoutée hors du dossier public/) : on ne peut
  // pas construire de srcset sans connaître les variantes réellement
  // disponibles, mais on garde le chargement différé, decoding async et les
  // dimensions explicites quand l'appelant les fournit.
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={resolvedLoading}
      decoding={decoding}
      onError={onError}
      {...props}
    />
  );
}

export default Image;
