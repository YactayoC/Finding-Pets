import validator from 'validator';

export const isValidFullname = (fullname: string): boolean => {
  const resp = validator.isAlpha(fullname, 'es-ES', { ignore: ' ' });
  return !!resp;
};

export const isFullname = (fullname: string): string | undefined => {
  return isValidFullname(fullname) ? undefined : 'No es un nombre válido';
};
