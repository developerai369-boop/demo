export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value) {
  return /^[0-9+\-\s()]{8,15}$/.test(value);
}

export function isRequired(value) {
  return typeof value === 'string' ? value.trim().length > 0 : !!value;
}

export function isMinLength(value, length) {
  return typeof value === 'string' && value.length >= length;
}
