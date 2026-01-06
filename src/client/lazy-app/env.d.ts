// Declaraciones ambient para `process.env` en el código cliente
declare global {
  const process: {
    env: {
      ALLOWED_UPLOAD_MIMES?: string;
      MAX_UPLOAD_BYTES?: string;
      [key: string]: string | undefined;
    };
  };
}

export {};
