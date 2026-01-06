import {
  ALLOWED_UPLOAD_MIMES,
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_BYTES_HUMAN,
} from './config';

export type ValidationResult =
  | { valid: true }
  | { valid: false; reason: string };

export function validateFile(file: File): ValidationResult {
  if (!ALLOWED_UPLOAD_MIMES.includes(file.type)) {
    return { valid: false, reason: `Formato no admitido: ${file.type}` };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      valid: false,
      reason: `Archivo demasiado grande (máx. ${MAX_UPLOAD_BYTES_HUMAN})`,
    };
  }

  return { valid: true };
}

export function filterValidFiles(files: File[]) {
  const accepted: File[] = [];
  const rejected: Array<{ file: File; reason: string }> = [];

  for (const file of files) {
    const res = validateFile(file);
    if (res.valid) accepted.push(file);
    else rejected.push({ file, reason: res.reason });
  }

  return { accepted, rejected };
}

export default { validateFile, filterValidFiles };
