/**
 * Utilidades para BatchCompress
 */

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function calculateSavings(
  original: number,
  compressed: number | null,
): string {
  if (!compressed) return '-';
  const savings = ((original - compressed) / original) * 100;
  return savings.toFixed(1) + '%';
}
