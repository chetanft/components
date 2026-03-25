/**
 * Resolves an image import to a string URL.
 * Handles both plain bundler imports (returns string) and
 * Next.js static image imports (returns { src: string }).
 */
export function resolveImageSrc(img: string | { src: string }): string {
  if (typeof img === 'object' && img !== null && 'src' in img) {
    return img.src;
  }
  return img as string;
}
