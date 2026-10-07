/**
 * Compresses an image File or Blob to a lightweight WebP/JPEG data URL.
 * Resizes large images (e.g. 4000x3000 down to max 1200x1200) and compresses quality,
 * reducing multi-MB photos down to ~50KB-120KB so LocalStorage never exceeds quota.
 */
export async function compressImage(file, maxWidth = 1200, maxHeight = 1200, quality = 0.78) {
  if (!file) return null;

  // If already a small URL/path or not a File/Blob, return as is
  if (typeof file === 'string') return file;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            maxHeight = maxHeight;
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target.result);
          return;
        }

        // Smooth rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Try webp first, fallback to jpeg
        try {
          const webpData = canvas.toDataURL('image/webp', quality);
          if (webpData.startsWith('data:image/webp')) {
            resolve(webpData);
            return;
          }
        } catch {
          // ignore fallback
        }

        try {
          const jpegData = canvas.toDataURL('image/jpeg', quality);
          resolve(jpegData);
        } catch {
          resolve(readerEvent.target.result);
        }
      };

      img.onerror = () => {
        resolve(readerEvent.target.result);
      };

      img.src = readerEvent.target.result;
    };

    reader.onerror = () => {
      resolve('/rugs/rug-8.jpeg');
    };

    reader.readAsDataURL(file);
  });
}
