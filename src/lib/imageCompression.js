// Compression/redimensionnement côté navigateur des images envoyées depuis
// l'admin, avant l'upload vers Supabase Storage (bucket "cms-media"). Sans
// cette étape, les fichiers partent tels quels — c'est ce qui a produit les
// portraits d'équipe de plusieurs milliers de pixels de large affichés dans
// des vignettes de 80px (voir README, section CMS).

export const MAX_WIDTH = 1600;
export const SKIP_COMPRESSION_MAX_BYTES = 300 * 1024; // 300 Ko
export const SKIP_COMPRESSION_MAX_WIDTH = 1600;
export const QUALITY = 0.88; // qualité visuelle préservée : pas de compression agressive
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20 Mo — au-delà, on refuse avant même de tenter de décoder le fichier

export class UploadTooLargeError extends Error {}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url });
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image illisible ou corrompue."));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/**
 * Redimensionne et compresse une image côté navigateur avant upload.
 * - Largeur max 1600px (jamais d'agrandissement).
 * - WebP par défaut, repli JPEG si le navigateur ne sait pas encoder WebP
 *   (canvas.toBlob retombe silencieusement sur un autre format dans ce cas).
 * - Image déjà légère (< 300 Ko) ET déjà étroite (< 1600px) : laissée intacte.
 * - Rejette avec UploadTooLargeError si le fichier dépasse MAX_UPLOAD_BYTES,
 *   avant toute tentative de décodage.
 *
 * Retourne { file, originalSize, compressedSize, wasCompressed, width, height }.
 */
export async function compressImageForUpload(file) {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadTooLargeError(
      `Fichier trop volumineux (${(file.size / 1024 / 1024).toFixed(1)} Mo). ` +
      `Taille maximale acceptée : ${MAX_UPLOAD_BYTES / 1024 / 1024} Mo.`,
    );
  }

  const originalSize = file.size;

  // SVG et autres types non rastérisables par <canvas> : pas de traitement.
  if (!/^image\/(png|jpe?g|webp)$/i.test(file.type)) {
    return { file, originalSize, compressedSize: file.size, wasCompressed: false, width: null, height: null };
  }

  const { img, url } = await loadImage(file);
  const { naturalWidth: width, naturalHeight: height } = img;
  URL.revokeObjectURL(url);

  if (originalSize <= SKIP_COMPRESSION_MAX_BYTES && width <= SKIP_COMPRESSION_MAX_WIDTH) {
    return { file, originalSize, compressedSize: originalSize, wasCompressed: false, width, height };
  }

  const scale = Math.min(1, MAX_WIDTH / width);
  const targetWidth = Math.round(width * scale);
  const targetHeight = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  canvas.getContext("2d").drawImage(img, 0, 0, targetWidth, targetHeight);

  let blob = await canvasToBlob(canvas, "image/webp", QUALITY);
  let ext = "webp";
  if (!blob || blob.type !== "image/webp") {
    blob = await canvasToBlob(canvas, "image/jpeg", QUALITY);
    ext = "jpg";
  }

  if (!blob || blob.size >= originalSize) {
    // La compression n'a rien gagné (rare) : garder l'original plutôt
    // qu'un fichier de remplacement plus lourd ou absent.
    return { file, originalSize, compressedSize: originalSize, wasCompressed: false, width, height };
  }

  const newName = file.name.replace(/\.[^.]+$/, "") + "." + ext;
  const compressedFile = new File([blob], newName, { type: blob.type });

  return {
    file: compressedFile,
    originalSize,
    compressedSize: compressedFile.size,
    wasCompressed: true,
    width: targetWidth,
    height: targetHeight,
  };
}
