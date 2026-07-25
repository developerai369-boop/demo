export { money } from './formatCurrency';

export function starString(rating) {
  return '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(0, 5 - rating);
}

const VISUAL_CLASS_MAP = {
  macos: 'product-visual--macbook',
  gaming: 'product-visual--gaming',
  ultrabook: 'product-visual--ultrabook',
  business: 'product-visual--business',
  windows: 'product-visual--windows',
  accessory: 'product-visual--accessory'
};

// A product can belong to several categories now — pick the most visually
// distinct one to color its placeholder icon (used only when there's no photo).
const VISUAL_PRIORITY = ['macos', 'gaming', 'ultrabook', 'business', 'windows'];

export function getVisualClass(categories) {
  const list = Array.isArray(categories) ? categories : [categories];
  const match = VISUAL_PRIORITY.find((c) => list.includes(c));
  return VISUAL_CLASS_MAP[match] || 'product-visual--windows';
}

export function getProductImageUrl(filename) {
  return filename ? `/images/products/${filename}` : null;
}

export const LAPTOP_ICON_SVG = (
  '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="10" y="14" width="44" height="28" rx="2.5" fill="#fff" fill-opacity="0.92"/>' +
    '<rect x="13" y="17" width="38" height="22" rx="1" fill="#0F172A" fill-opacity="0.85"/>' +
    '<path d="M6 46h52l3 6a2 2 0 0 1-2 3H5a2 2 0 0 1-2-3l3-6z" fill="#fff" fill-opacity="0.92"/>' +
    '<rect x="27" y="49" width="10" height="1.6" rx="0.8" fill="#0F172A" fill-opacity="0.3"/>' +
  '</svg>'
);
