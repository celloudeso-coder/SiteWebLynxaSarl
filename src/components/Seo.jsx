import React from "react";
import { Helmet } from "react-helmet";
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_ALT,
  ORGANIZATION_JSON_LD,
  absoluteUrl,
} from "../lib/seo";

/**
 * Bloc SEO commun à toutes les pages publiques : title, description,
 * canonical, Open Graph, Twitter Card et JSON-LD (Organization par défaut,
 * plus tout schéma additionnel passé via `jsonLd`).
 *
 * `path` doit être le chemin de la route (ex. "/about") ; `image` peut être
 * un chemin ("/mon-image.png") ou une URL absolue — sinon l'image de
 * partage par défaut (public/og-default.png) est utilisée.
 */
export default function Seo({
  title,
  description,
  path,
  keywords,
  ogTitle,
  ogDescription,
  ogType = "website",
  image,
  imageAlt,
  jsonLd = [],
  includeOrganization = true,
}) {
  const url = absoluteUrl(path);
  const resolvedImage = absoluteUrl(image || DEFAULT_OG_IMAGE_PATH);
  const resolvedImageAlt = imageAlt || DEFAULT_OG_IMAGE_ALT;
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDescription = ogDescription || description;
  const schemas = includeOrganization ? [ORGANIZATION_JSON_LD, ...jsonLd] : jsonLd;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      <meta property="og:title" content={resolvedOgTitle} />
      {resolvedOgDescription && <meta property="og:description" content={resolvedOgDescription} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedImageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      {resolvedOgDescription && <meta name="twitter:description" content={resolvedOgDescription} />}
      <meta name="twitter:image" content={resolvedImage} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
