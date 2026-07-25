export function money(n) {
  return '$' + Number(n).toFixed(2).replace(/\.00$/, '');
}

export function formatCurrency(n) {
  return money(n);
}
