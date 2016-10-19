/**
 * Formats amounts in cents (Matcherino default) to currency.
 */
export function centsToCurrency(amount, maximumFractionDigits=0, currency='USD') {
  const dollars = amount / 100;
  return dollars.toLocaleString('US', {style: 'currency', currency, maximumFractionDigits});
}

/**
 * Percentage values are transmitted in basis points. e.g. 10% is 1000
 */
export function basisPointsToPercentage(n) {
  console.log('n', n)
    return Math.floor(n / 100) + '%';
}
